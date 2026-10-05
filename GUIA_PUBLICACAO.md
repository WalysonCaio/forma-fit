> Já tem o Forma publicado? Use GUIA_ATUALIZACAO_1_1.md. Este guia abaixo é para instalação inicial.

# Publicar o Forma: GitHub + Supabase + Cloudflare + Gemini

Você receberá uma pasta `forma` dentro do ZIP. O código está pronto para configuração, mas o aplicativo ainda não está publicado na sua conta. GitHub guarda o código; Cloudflare hospeda a interface e a API; Supabase guarda contas/dados/fotos; Gemini responde aos pedidos autorizados.

## 1. Preparar o computador

1. Baixe o ZIP e use **Extrair tudo** no Windows.
2. Coloque a pasta, por exemplo, em `C:\Projetos\forma`.
3. Instale Node.js 22 ou superior compatível com Wrangler, pelo site https://nodejs.org/.
4. Instale Git pelo site https://git-scm.com/.
5. Abra um novo CMD e execute:

```bat
node --version
npm --version
git --version
cd C:\Projetos\forma
npm ci
```

Se a sua pasta estiver em outro lugar, substitua o caminho. Todos os próximos comandos serão executados **dentro da pasta forma**, onde está `package.json`.

## 2. Criar o banco no Supabase

1. Entre em https://supabase.com/dashboard e crie um projeto **novo**, separado de outros aplicativos.
2. Escolha nome, região e uma senha forte para o banco. Essa senha não é a senha dos usuários do app.
3. Aguarde a criação.
4. Abra **SQL Editor → New query**.
5. Abra `supabase.sql` no editor de texto, copie todo o conteúdo, cole no SQL Editor e clique **Run**.
6. Execute esse arquivo uma única vez. Ele cria tabelas, políticas, funções e o bucket privado `progress`. Não reutilize um projeto que já tenha essas tabelas sem planejar uma migração.
7. Em **Project Settings → API/Data API/API Keys**, localize:
   - URL do projeto: `https://...supabase.co`.
   - chave pública `anon` (a chave JWT legada é adequada para esta versão).
   - chave administrativa `service_role` legada. **Nunca coloque essa chave no frontend, GitHub ou mensagens.**

A API recebe a chave pública no cabeçalho `apikey` e o JWT da conta em `Authorization` para aplicar RLS. A chave administrativa permite excluir a conta e seus dados associados. Esta versão foi feita para as chaves legadas JWT `anon`/`service_role`; mantenha esse par para seguir o guia sem adaptações.

## 3. Configurar login e os e-mails

Em **Authentication → Providers/Sign In → Email**, habilite login por e-mail/senha e confirmação de e-mail. Defina a senha mínima com pelo menos 10 caracteres.

Em **Authentication → URL Configuration**:

- Durante desenvolvimento, use `http://localhost:8787` como URL local e permita essa URL de redirecionamento.
- Após publicar, altere **Site URL** para a URL HTTPS que a Cloudflare informar e adicione essa URL aos redirecionamentos permitidos.

Este aplicativo usa links com `token_hash` para trocar o token no servidor, sem colocar os tokens da sessão no JavaScript.

Em **Authentication → Email Templates**, ajuste:

### Confirm signup

```html
<h2>Confirme sua conta Forma</h2>
<p><a href="{{ .SiteURL }}/?token_hash={{ .TokenHash }}&type=email">Confirmar meu e-mail</a></p>
```

### Reset password

```html
<h2>Redefinir senha do Forma</h2>
<p><a href="{{ .SiteURL }}/?token_hash={{ .TokenHash }}&type=recovery">Escolher nova senha</a></p>
```

### Change email address

```html
<h2>Confirmar alteração de e-mail</h2>
<p><a href="{{ .SiteURL }}/?token_hash={{ .TokenHash }}&type=email_change">Confirmar alteração</a></p>
```

Mantenha a opção de confirmação segura do novo e-mail. Ative as notificações de segurança de alteração de senha/e-mail se disponíveis.

**Para compartilhar com sua esposa e amigos, configure um provedor SMTP em Authentication → SMTP.** O envio padrão do Supabase é limitado e pode restringir os destinatários; não conte com ele como solução de e-mail para várias pessoas. Use a orientação atual do painel para configurar remetente e provedor. Sem e-mail entregue, confirmação e recuperação não funcionarão para todos.

## 4. Criar a chave Gemini

1. Entre em https://aistudio.google.com/apikey.
2. Crie ou selecione um projeto e gere a chave Gemini.
3. Restrinja a chave à Gemini API conforme as opções do Google Cloud/AI Studio.
4. Confira se o modelo escolhido está disponível para sua conta e quais cotas/custos se aplicam.
5. O valor inicial configurado é `gemini-3.5-flash-lite`; você pode alterar `GEMINI_MODEL` no arquivo `wrangler.jsonc` e republicar. Não use um modelo TTS neste campo: a função espera geração de texto/JSON pelo endpoint `generateContent`.

O app limita a 20 **tentativas** diárias de IA por conta no banco, inclusive pedidos cujo serviço falhe, para controlar abuso. Isso não substitui orçamento/limites no Google Cloud. A voz desta versão é a leitura do navegador, sem custo de geração TTS do Gemini.

## 5. Testar no computador

No CMD, na pasta do projeto:

```bat
copy .dev.vars.example .dev.vars
```

Abra `.dev.vars` no editor de texto. Preencha os valores:

```text
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=CHAVE-ANON-LEGADA
SUPABASE_SERVICE_ROLE_KEY=CHAVE-SERVICE-ROLE-LEGADA
GEMINI_API_KEY=CHAVE-GEMINI
GEMINI_MODEL=gemini-3.5-flash-lite
```

Não coloque aspas extras se não forem necessárias. Salve e execute:

```bat
npm test
npm run check
npm run dev
```

Abra o endereço que Wrangler informar, normalmente `http://localhost:8787`.

- **Explorar demonstração** testa a experiência sem criar conta.
- **Criar conta** usa seu Supabase real, com dados iniciais vazios.
- Configure seu perfil, adicione fichas, alimentos e refeições.
- Os seus dados pessoais aparecem somente na demonstração local; **novas contas não recebem os dados de Walyson**.

Para encerrar o servidor, pressione `Ctrl+C` no CMD.

## 6. Enviar ao GitHub

1. Entre em https://github.com/new.
2. Crie um repositório **privado**, por exemplo `forma-fit`.
3. Não marque a criação de README, licença ou `.gitignore`, pois os arquivos já existem.
4. No CMD da pasta do projeto, execute os comandos abaixo. Troque `SEU-USUARIO` pelo seu usuário GitHub:

```bat
git init
git add .
git commit -m "Primeira versao do Forma"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/forma-fit.git
git push -u origin main
```

Se o Git pedir sua identificação, configure seu nome e e-mail e repita o commit:

```bat
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
```

Autorize o login do GitHub quando solicitado. Não use sua senha da conta como token no CMD.

Antes de enviar, confira:

```bat
git status
git ls-files .dev.vars
```

O segundo comando **não deve mostrar nada**. `.dev.vars`, `.env`, dependências e arquivos internos estão no `.gitignore`. O arquivo `.dev.vars.example` contém apenas exemplos e pode ser enviado. Depois do commit e push, `git status` deve indicar a árvore limpa; cores vermelhas geralmente representam arquivos modificados ou não adicionados, e não uma falha do site.

## 7. Publicar na Cloudflare — caminho recomendado pelo CMD

1. Crie/acesse sua conta em https://dash.cloudflare.com/.
2. Na pasta do projeto:

```bat
npx wrangler login
```

3. Autorize a Cloudflare no navegador.
4. Execute a primeira publicação:

```bat
npm run deploy
```

Isso cria o Worker `forma-fit`. Se esse nome conflitar com outro projeto seu, mude `name` em `wrangler.jsonc` e use o novo nome nos passos seguintes. Você receberá uma URL semelhante a `https://forma-fit.SEUA-CONTA.workers.dev`; use **a URL realmente informada**, não este exemplo.

5. Cadastre os segredos, um comando por vez. Cada comando solicitará o valor para colar:

```bat
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put GEMINI_API_KEY
```

Os valores de `.dev.vars` são locais; **eles não são publicados automaticamente**. Não cole segredos em `wrangler.jsonc` ou em arquivos do Git.

6. Execute novamente:

```bat
npm run deploy
```

7. Volte ao Supabase e ajuste **Site URL** e redirecionamentos para sua URL HTTPS publicada.
8. Crie uma conta, confirme o e-mail e teste o login na URL publicada.

Não precisa rodar `npx supabase` para este fluxo: a migração é aplicada pelo SQL Editor. O aplicativo usa **Cloudflare Workers com Static Assets**; não publique apenas a pasta `public` no Pages, pois login, Gemini e autorização dependem do servidor `worker.mjs`.

## 8. Publicação automática pelo GitHub (opcional)

Depois de a publicação pelo CMD funcionar:

1. Abra o Worker no painel Cloudflare, em **Workers & Pages → forma-fit → Settings → Builds** ou a área atual de integração Git.
2. Conecte GitHub e selecione `forma-fit` e a branch `main`.
3. Use a raiz do repositório como diretório do projeto.
4. Comando de build/verificação: `npm ci && npm run check && npm test`.
5. Comando de deploy: `npx wrangler deploy`.
6. Confirme que os segredos continuam cadastrados no ambiente de produção do Worker; build não precisa das chaves de produção para os testes simulados.
7. O push em `main` passará a publicar novas versões conforme a integração configurada.

Não configure Workers e Pages ao mesmo tempo para este projeto. A hospedagem prevista é Workers. Nomes de telas podem mudar; a alternativa pelo CMD acima continua sendo o fluxo principal.

## 9. Conferir antes de convidar sua esposa e amigos

Use duas contas distintas (ou janelas/perfis de navegador distintos):

1. Cada pessoa cria e confirma sua conta, cadastra o próprio perfil.
2. Crie uma ficha na conta A. A conta B não pode vê-la.
3. Envie uma foto em A. B não pode vê-la nem obtê-la pelo painel do aplicativo.
4. Busque B pelo @usuário, envie convite e aceite em B.
5. Antes de ativar compartilhamento, ofensiva/total de A devem aparecer como privados em B.
6. Ative compartilhar progresso em A. B verá somente a ofensiva, os dias treinados e se treinou hoje.
7. Conclua todas as séries de dois exercícios e finalize: a sessão aparece, mas o dia não conta.
8. Conclua três exercícios e finalize: o dia conta uma vez. Outra sessão válida no mesmo dia não soma outro dia.
9. Inicie outro treino, registre cargas, conclua uma série e acione descanso. Atualize a página. A série, o início e o prazo do descanso devem permanecer.
10. Abra a mesma conta em outro dispositivo, altere o treino. Ao salvar uma versão antiga, deve surgir conflito, em vez de sobrescrever silenciosamente.
11. Teste envio de uma sugestão Gemini, leitura em voz e revisão antes de salvar. Teste também falha de conexão/chave e verifique se o formulário mostra o erro.
12. Troque nome e @usuário: deve pedir senha atual. Senha errada não pode alterar.
13. Teste recuperação pelo e-mail com um link novo. O link de recuperação autoriza a redefinição por 10 minutos após ser validado pelo aplicativo.
14. Teste exclusão numa conta descartável: registros e fotos dela devem ser removidos; a outra conta permanece.
15. Confira visual e uso no Android, desktop e dispositivo de sua esposa. A leitura/ditado depende do navegador.

Fotos assinadas expiram em 120 segundos. Se uma imagem não abrir mais, use **Atualizar** na seção de fotos.

## 10. Instalar no celular e atualizar

No Android/Chrome, abra sua URL HTTPS e use **Adicionar à tela inicial / Instalar aplicativo**, conforme o menu disponível. No iPhone/iPad/Safari, use **Compartilhar → Adicionar à Tela de Início**. Os menus e suporte podem variar.

A PWA é a mesma conta da web. Ela salva a interface para acesso mais rápido e mantém o rascunho local durante interrupções de conexão. **Não oferece login inicial offline nem sincronização sem internet.** O aplicativo não produz APK nesta versão.

Para futuras alterações:

```bat
npm test
npm run check
git add .
git commit -m "Descreva a alteracao"
git push
```

Se não ativou publicação automática, execute também:

```bat
npm run deploy
```

## Se der erro

| Sintoma | O que conferir |
|---|---|
| “Configure o Supabase” | Segredos cadastrados no Worker, com os nomes exatos; `.dev.vars` não vale para produção |
| Usuário não confirma e-mail | SMTP, caixa de spam, Site URL e template com `token_hash` |
| Perfil não encontrado | `supabase.sql` aplicado antes de cadastrar usuários; trigger `on_signup` |
| Gemini indisponível | Chave, modelo disponível, cotas e faturamento no AI Studio/Google Cloud |
| Fotos não enviam | Bucket `progress` privado, políticas Storage, tipo permitido e limite de 8 MB |
| Página abre mas login/Gemini falham | Publicação deve incluir Worker, não apenas arquivos estáticos |
| Conflito no treino | Use “Resolver rascunho local” e escolha a versão conscientemente |
| Alteração não aparece após push | Verifique deployment concluído; sem integração Git execute `npm run deploy`; recarregue a PWA |

## Fontes e referências

- Cloudflare Workers Static Assets: https://developers.cloudflare.com/workers/static-assets/
- Cloudflare integração Git/builds: https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- Supabase autenticação: https://supabase.com/docs/guides/auth/passwords
- Templates de e-mail: https://supabase.com/docs/guides/auth/auth-email-templates
- Supabase SMTP: https://supabase.com/docs/guides/auth/auth-smtp
- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Segurança Gemini: https://ai.google.dev/gemini-api/docs/api-key
- Referências de experiência: registro de séries e fichas no Hevy (https://www.hevyapp.com/features/track-workouts/) e diário de treino Strong (https://www.strong.app/). O Forma tem identidade visual própria; não usa imagens ou marca dessas empresas.

## O que foi validado nesta entrega

Testes locais de API, SQL/RLS em PostgreSQL via PGlite, interface em DOM simulado e empacotamento Cloudflare em modo dry-run passaram. A criação de contas, envio de e-mail, IA e fotos em seus serviços reais ainda precisam ser conferidos após configuração. Não houve publicação nem inspeção visual em navegador real. Não trate isso como auditoria de segurança ou promessa de ausência de defeitos.
