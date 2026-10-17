# Forma 1.5 — atualização e correção do acesso

## 1. Prepare a pasta

1. Termine e sincronize treino/corrida em andamento. Feche o Forma.
2. Faça uma cópia de `C:\Users\Walyson Caio\Documents\forma`, chamada `forma_backup_antes_1_5`.
3. Extraia o novo `Forma_App.zip` em Downloads.
4. Copie todo o conteúdo da pasta `forma` extraída para `C:\Users\Walyson Caio\Documents\forma`, aceitando substituir.
5. Preserve `.git`, `.dev.vars` e suas chaves. O pacote não contém chaves reais.

## 2. Banco

Se já executou **ATUALIZACAO_1_4.sql**, não há novo SQL obrigatório. Se não executou, abra esse arquivo no Bloco de Notas, copie e execute em Supabase → seu projeto → SQL Editor → New query → Run. Ele também contempla as atualizações anteriores e preserva registros e políticas. Não execute o `supabase.sql` completo no banco existente.

## 3. Verifique e publique

Abra o CMD. Execute um comando por vez e espere terminar:

```bat
cd /d "C:\Users\Walyson Caio\Documents\forma"
```

```bat
npm install
```

```bat
npm run check
```

```bat
npm test
```

Devem passar 44 testes. Se falhar, copie a mensagem antes de publicar.

```bat
git add .
```

```bat
git commit -m "Corrige recuperação de senha e melhora treino guiado"
```

```bat
git push
```

```bat
npm run deploy
```

Se pedir autenticação Cloudflare, execute `npx wrangler login` e depois repita `npm run deploy`.

Feche todas as abas e janelas instaladas do Forma. Abra novamente. No computador use Ctrl + F5. O endereço permanece https://forma-fit.wcaio.workers.dev .

## 4. Corrija a recuperação de sua conta

O código foi corrigido; sua senha real não foi lida, alterada nem testada durante esta revisão. A entrega de e-mail depende do Supabase do seu projeto.

### Confira URLs no Supabase

1. Entre no painel do Supabase e abra o projeto do Forma.
2. Vá a **Authentication → URL Configuration**.
3. Em Site URL informe `https://forma-fit.wcaio.workers.dev`.
4. Em Redirect URLs adicione `https://forma-fit.wcaio.workers.dev/` e `https://forma-fit.wcaio.workers.dev/?recovery=1`.
5. Salve.

A atualização aceita o link padrão do Supabase e o link personalizado com token_hash. Ao abrir o link padrão, valida a sessão no Supabase e exige comprovação de recuperação recente antes de autorizar a troca de senha. Os tokens são removidos da barra de endereço imediatamente. Uma sessão comum não recebe permissão de recuperação só porque alguém escreveu type=recovery na URL.

### Confira envio de e-mail

1. No Supabase, abra **Authentication → Email → SMTP Settings** (a organização do menu pode variar; procure a configuração SMTP de Auth).
2. Se estiver usando o serviço padrão, saiba que ele restringe destinatários e tem cota pequena. Ele pode impedir envio para sua esposa/amigos ou para endereços fora dos membros autorizados do projeto.
3. Para esses destinatários, configure SMTP próprio: remetente autorizado, host, porta, usuário e senha fornecidos pelo seu serviço de e-mail. O aplicativo não consegue criar essas credenciais por você. Não use senha pessoal nem publique senha SMTP no GitHub.
4. Confira **Authentication → Logs** e **Rate Limits** se o pedido continuar falhando.
5. Em **Authentication → Users**, confira se o e-mail da sua conta está correto e se a confirmação está pendente. Não exclua e recrie sua conta para resolver login, pois isso pode perder dados.

### Solicite a nova senha

1. Abra o Forma atualizado.
2. Clique Esqueci minha senha e informe o e-mail da conta.
3. Aguarde o e-mail; confira spam e use somente o pedido mais recente.
4. Abra o link recebido. A tela pede nova senha e confirmação.
5. Salve e faça login com a nova senha. A recuperação não precisa carregar seu perfil antes de abrir o formulário de senha.
6. Se aparecer confirmação pendente, use Reenviar confirmação na tela de login.

Opcional: se o modelo de e-mail usar código, há Tenho código de recuperação. É necessário receber o código de redefinição, não qualquer código de login. Para incluir código no modelo Reset Password, o Supabase disponibiliza `{{ .Token }}`. O modelo pode continuar usando seu link padrão `{{ .ConfirmationURL }}`. Não é obrigatório alterar modelos para o link padrão funcionar nesta versão.

### Chave de recuperação no Cloudflare

A recuperação segura usa `SUPABASE_SERVICE_ROLE_KEY` somente no servidor para assinar uma autorização curta. Se o aplicativo informar que falta essa chave:

```bat
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

Cole a chave administrativa correta do projeto Supabase no prompt do Wrangler. Não escreva a chave dentro de nenhum arquivo publicado nem cole em conversa. Confira o projeto e guarde as chaves apenas nos serviços corretos.

Mensagens agora distinguem e-mail/senha incorretos, e-mail não confirmado, link expirado, cota de e-mails e SMTP bloqueado. Sem o erro retornado pelo seu serviço não dá para afirmar qual desses era o problema real da sua conta.

## 5. Escolha entre ficha do dia e anterior

Na tela Hoje existe **Qual ficha você quer fazer?**

Calendário ABC: segunda A, terça B, quarta C, quinta A, sexta B, sábado C. Domingo é recuperação. A ficha anterior aparece quando não há série registrada daquele grupo no último dia programado anterior. Exemplo: terça-feira sem sessão A na segunda oferece Ficha do dia — B e Ficha anterior — A.

Escolher A na terça não desloca automaticamente o calendário: quarta continua C. Você também pode selecionar qualquer ficha na aba Treinos. O histórico registra qual foi feita. Sessões parciais com séries já registradas não são tratadas como uma falta completa; acompanhe o que ficou pendente. A ofensiva continua exigindo ao menos três exercícios completos e finalização.

Fichas D continuam disponíveis na aba Treinos. Não é necessário treinar dois grupos no mesmo dia para compensar uma ausência. Respeite recuperação e limitações informadas no perfil.

## 6. Dúvidas, imagens e substituições

- Antes do treino: Treinos → Ver exercícios e dúvidas.
- Durante: em cada exercício clique Dúvidas e imagens.
- Veja finalidade, execução, cuidados, histórico recente, progressão/RIR quando fornecidos na nova proposta e alternativas.
- O catálogo tem 31 exercícios/variações com ilustrações esquemáticas próprias. Elas mostram duas posições de referência, não são vídeos, análise de movimento ou medida de amplitude individual. Não mostram todos os detalhes de pegada/equipamento.
- Exercícios personalizados ou nomes sem correspondência segura recebem explicação em texto e aviso de que não há imagem cadastrada. O app não aplica uma imagem genérica incorreta.
- Com aparelho ocupado: Substituir exercício → escolha → Salvar. A troca vale somente para a sessão atual e mantém a ficha original.
- A carga zera e as séries/repetições planejadas são preservadas para você ajustar. O histórico da troca é salvo. Cargas de uma substituição não são copiadas para o exercício original na próxima sessão.
- A troca automática fica bloqueada depois que você concluiu séries daquele exercício, para evitar apagar o que fez. Use Editar sessão para reorganizar o restante preservando os registros.

Alternativas catalogadas e alternativas da IA podem alterar ênfase, apoio e exigência técnica. Uma alternativa não é uma adaptação clínica para uma lesão. O aplicativo não consegue observar sua execução ao vivo.

## 7. Planos menos genéricos

Complete experiência, dias disponíveis, minutos por sessão, equipamentos, limitações, objetivo e sono no perfil. Registre cargas e repetições reais. O contexto da IA passa a incluir até cinco sessões recentes e o peso mais recente consultado separadamente, evitando perder esses dados quando há muitos registros.

As novas propostas pedem justificativa por exercício, repetições em reserva, regra de progressão e alternativas por equipamento. A IA deve relacionar essas escolhas ao perfil e ao TAF e perguntar quando faltam informações. O texto é uma sugestão gerada: não transforma o app num profissional que observa e corrige técnica.

Para obter esses campos em fichas antigas, gere nova proposta, revise e salve. Nada é substituído silenciosamente. As propostas ficam desatualizadas se o contexto mudar antes de aplicar, incluindo novo histórico de treino.

A análise de fotos foi removida da interface e da API. Pedidos antigos que tentem enviar foto à IA são recusados antes de consumir a cota. O álbum privado de evolução continua opcional e não é enviado ao Gemini.

## 8. O que foi verificado

- Sintaxe de todos os módulos do aplicativo.
- 44 testes automatizados, incluindo login, erros de e-mail, recuperação padrão/customizada/código, proteção contra recuperação adulterada, callbacks, pausa, propostas, TAF e macros.
- Criar, consultar, editar e excluir todos os 16 tipos de registro pela API com provedor simulado, inclusive conflito de versão.
- Migração e RLS num PostgreSQL local em memória: outro usuário não consegue consultar, atualizar ou excluir os registros; o dono consegue editar/excluir.
- Troca de exercício com carga zerada sem modificar a ficha; bloqueio de troca após séries concluídas; guias e escolhas ABC por data brasileira.
- Registro das ações dos botões renderizados em todas as abas e fluxos de interface em navegador simulado.
- Preparação de publicação Cloudflare em modo simulado.

Não foram usados sua senha, seu banco real nem sua chave Gemini. Não houve envio real de e-mail ou confirmação visual em celular físico. O navegador gráfico de teste não pôde ser instalado no ambiente; os testes de interface foram executados com DOM simulado. As ilustrações SVG foram renderizadas e inspecionadas separadamente. Testes não certificam ausência de qualquer erro.

Fontes técnicas consultadas: https://supabase.com/docs/guides/auth/auth-email-templates ; https://supabase.com/docs/guides/auth/jwt-fields ; https://supabase.com/docs/guides/auth/debugging/error-codes ; https://supabase.com/docs/guides/auth/auth-smtp . Referência de consulta de exercícios: https://www.acefitness.org/resources/everyone/exercise-library/ .
