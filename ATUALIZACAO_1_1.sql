-- Forma 1.1: execute UMA VEZ no SQL Editor do Supabase (pode repetir).
-- Não exclui nem substitui registros existentes.
begin;
alter table public.records drop constraint if exists records_kind_check;
alter table public.records add constraint records_kind_check check(kind in ('routine','meal','pantry','measurement','draft','workout','taf_test','taf_plan','taf_session','run','run_draft','ai_proposal'));
create unique index if not exists one_run_draft_per_user on public.records(user_id) where kind='run_draft';
commit;
