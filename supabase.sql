-- Execute UMA VEZ no SQL Editor de um projeto Supabase novo.
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 username text unique not null check(username ~ '^[a-z0-9_]{3,24}$'),
 name text not null check(length(name) between 1 and 80),
 share_progress boolean not null default false,
 settings jsonb not null default '{}'::jsonb
);
create table public.records (
 id uuid primary key, user_id uuid not null references auth.users(id) on delete cascade,
 kind text not null check(kind in ('routine','meal','pantry','measurement','draft','workout')),
 data jsonb not null, version integer not null default 1,
 updated_at timestamptz not null default now()
);
create index records_owner on public.records(user_id,kind);
create unique index one_draft_per_user on public.records(user_id) where kind='draft';
create table public.friendships (
 id uuid primary key default gen_random_uuid(),
 requester uuid not null references auth.users(id) on delete cascade,
 recipient uuid not null references auth.users(id) on delete cascade,
 status text not null default 'pending' check(status in ('pending','accepted')),
 created_at timestamptz not null default now(), check(requester<>recipient)
);
create unique index friendship_pair on public.friendships(least(requester,recipient),greatest(requester,recipient));
create table public.photos (
 id uuid primary key, user_id uuid not null references auth.users(id) on delete cascade,
 path text not null unique, caption text not null default '', created_at timestamptz not null default now()
);
create table public.ai_usage(user_id uuid not null references auth.users(id) on delete cascade, day date not null default current_date, calls integer not null default 0, primary key(user_id,day));

create function public.new_profile() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,username,name) values(new.id,new.raw_user_meta_data->>'username',new.raw_user_meta_data->>'name');
 return new;
end $$;
create trigger on_signup after insert on auth.users for each row execute function public.new_profile();

-- O banco também valida a ofensiva e a data, mesmo que alguém tente contornar a interface/API.
create function public.record_guard() returns trigger language plpgsql set search_path='' as $$
declare valid_count integer; total_count integer;
begin
 if jsonb_typeof(new.data)<>'object' or octet_length(new.data::text)>160000 then raise exception 'Dados inválidos'; end if;
 if TG_OP='UPDATE' then
  if new.user_id<>old.user_id or new.kind<>old.kind or new.id<>old.id then raise exception 'Identidade imutável'; end if;
  new.version:=old.version+1;
 end if;
 new.updated_at:=now();
 if new.kind='workout' then
  if jsonb_typeof(new.data->'exercises') is distinct from 'array' then raise exception 'Exercícios inválidos'; end if;
  select count(distinct ex->>'id') into valid_count from jsonb_array_elements(new.data->'exercises') ex
  where jsonb_typeof(ex->'sets')='array' and jsonb_array_length(ex->'sets') between 1 and 10
   and not exists(select 1 from jsonb_array_elements(ex->'sets') s where
    s->'done' is distinct from 'true'::jsonb or jsonb_typeof(s->'reps') is distinct from 'number' or
    jsonb_typeof(s->'kg') is distinct from 'number' or (s->>'reps')::numeric not between 1 and 200 or (s->>'kg')::numeric not between 0 and 1000);
  new.data:=jsonb_set(new.data,'{qualified}',to_jsonb(valid_count>=3));
  if TG_OP='INSERT' then new.data:=jsonb_set(new.data,'{finished_at}',to_jsonb(now()));
  else new.data:=jsonb_set(new.data,'{finished_at}',old.data->'finished_at'); end if;
 end if;
 return new;
end $$;
create trigger guard_record before insert or update on public.records for each row execute function public.record_guard();
create function public.friend_guard() returns trigger language plpgsql set search_path='' as $$
begin
 if new.id<>old.id or new.requester<>old.requester or new.recipient<>old.recipient then raise exception 'Identidade imutável'; end if;
 return new;
end $$;
create trigger guard_friend before update on public.friendships for each row execute function public.friend_guard();

alter table public.profiles enable row level security;
alter table public.records enable row level security;
alter table public.friendships enable row level security;
alter table public.photos enable row level security;
alter table public.ai_usage enable row level security;
create policy profile_read on public.profiles for select to authenticated using(id=auth.uid());
create policy profile_update on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy records_own on public.records for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
create policy photos_own on public.photos for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid() and split_part(path,'/',1)=auth.uid()::text);
create policy friend_read on public.friendships for select to authenticated using(requester=auth.uid() or recipient=auth.uid());
create policy friend_create on public.friendships for insert to authenticated with check(requester=auth.uid() and status='pending');
create policy friend_accept on public.friendships for update to authenticated using(recipient=auth.uid() and status='pending') with check(recipient=auth.uid() and status='accepted');
create policy friend_delete on public.friendships for delete to authenticated using(requester=auth.uid() or recipient=auth.uid());
revoke all on public.ai_usage from anon,authenticated;
revoke all on public.profiles,public.records,public.friendships,public.photos from anon;
grant select,update on public.profiles to authenticated;
grant select,insert,update,delete on public.records,public.friendships,public.photos to authenticated;

-- Não expõe e-mail, fotos, medidas ou dieta na busca.
create function public.search_people(query text) returns table(id uuid,username text,name text)
language sql security definer set search_path='' as $$
 select p.id,p.username,p.name from public.profiles p where auth.uid() is not null and p.id<>auth.uid()
 and length(query) between 2 and 24 and p.username like replace(replace(lower(query),'%',''),'_','\_')||'%' limit 15;
$$;
-- Progresso por dias de calendário de Brasília, calculado a partir dos treinos válidos.
create function public.progress_for(target uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare days date[]; today date:=(now() at time zone 'America/Sao_Paulo')::date; streak integer:=0; anchor date; d date;
begin
 select array_agg(distinct ( (data->>'finished_at')::timestamptz at time zone 'America/Sao_Paulo')::date)
 into days from public.records where user_id=target and kind='workout' and data->>'qualified'='true';
 days:=coalesce(days,array[]::date[]);anchor:=today;
 if not today=any(days) then anchor:=today-1; end if;
 while anchor=any(days) loop streak:=streak+1;anchor:=anchor-1;end loop;
 return jsonb_build_object('streak',streak,'total',cardinality(days),'today',today=any(days),'days',days);
end $$;
create function public.my_progress() returns jsonb language sql security definer set search_path='' as $$
 select public.progress_for(auth.uid()) where auth.uid() is not null;
$$;
create function public.friend_list() returns jsonb language sql security definer set search_path='' as $$
 select coalesce(jsonb_agg(jsonb_build_object('id',f.id,'status',f.status,'incoming',f.recipient=auth.uid(),'user_id',p.id,'username',p.username,'name',p.name,
 'progress',case when f.status='accepted' and p.share_progress then public.progress_for(p.id)-'days' else null end)),'[]'::jsonb)
 from public.friendships f join public.profiles p on p.id=case when f.requester=auth.uid() then f.recipient else f.requester end
 where f.requester=auth.uid() or f.recipient=auth.uid();
$$;
create function public.use_ai_quota() returns boolean language plpgsql security definer set search_path='' as $$
declare n integer;
begin
 if auth.uid() is null then return false; end if;
 insert into public.ai_usage(user_id,day,calls) values(auth.uid(),current_date,1)
 on conflict(user_id,day) do update set calls=public.ai_usage.calls+1 where public.ai_usage.calls<20 returning calls into n;
 return n is not null;
end $$;
revoke all on function public.progress_for(uuid),public.my_progress(),public.friend_list(),public.search_people(text),public.use_ai_quota(),public.new_profile() from public,anon;
grant execute on function public.my_progress(),public.friend_list(),public.search_people(text),public.use_ai_quota() to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('progress','progress',false,8388608,array['image/jpeg','image/png','image/webp']);
create policy private_progress_read on storage.objects for select to authenticated using(bucket_id='progress' and (storage.foldername(name))[1]=auth.uid()::text);
create policy private_progress_insert on storage.objects for insert to authenticated with check(bucket_id='progress' and (storage.foldername(name))[1]=auth.uid()::text);
create policy private_progress_delete on storage.objects for delete to authenticated using(bucket_id='progress' and (storage.foldername(name))[1]=auth.uid()::text);
