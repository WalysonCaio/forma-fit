# Forma 1.1 — atualização do aplicativo já publicado

Este pacote atualiza seu Forma no GitHub, Cloudflare e Supabase. Os serviços e as chaves já configurados continuam sendo usados. Não precisa criar outro repositório nem outro banco.

## 1. Prepare a pasta no Windows

1. Termine ou salve o treino e a corrida em andamento. Saia do aplicativo.
2. No Explorador de Arquivos, abra `C:\Users\Walyson Caio\Documents`.
3. Copie a pasta `forma` para uma pasta de backup chamada `forma_backup_antes_1_1`.
4. Baixe e extraia `Forma_App.zip` em outra pasta, por exemplo Downloads.
5. Abra a pasta `forma` dentro do ZIP extraído.
6. Copie todo o conteúdo dela para `C:\Users\Walyson Caio\Documents\forma`.
7. Quando o Windows perguntar, escolha substituir os arquivos existentes.

Preserve a pasta `.git`, seu arquivo `.dev.vars` e suas chaves. O ZIP não contém chaves reais, pasta `.git` nem `node_modules`. Não renomeie `.dev.vars.example` para substituir suas configurações existentes.

## 2. Atualize o banco existente

1. Abra o painel do Supabase e selecione o projeto `forma-fit`.
2. Abra **SQL Editor**.
3. Clique em **New query**.
4. No Windows, abra o arquivo `ATUALIZACAO_1_1.sql` da pasta `forma` com o Bloco de Notas.
5. Copie todo o conteúdo e cole na nova consulta.
6. Clique em **Run** e espere a confirmação de sucesso.

Use `ATUALIZACAO_1_1.sql` para atualizar. Não execute novamente o `supabase.sql` completo, que é para instalação inicial.

A atualização aceita registros TAF, corridas, rascunhos de corrida e propostas da IA. Preserva tabelas, registros e políticas existentes. Pode ser repetida sem apagar os dados. As políticas atuais de isolamento por usuário também protegem os novos registros, incluindo o percurso GPS.

## 3. Instale e verifique os arquivos

Abra o CMD e execute um comando por vez:

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

Todos os testes devem passar. Se houver erro, copie a mensagem antes de publicar.

## 4. Atualize seu GitHub

Na mesma janela de CMD:

```bat
git status
```

```bat
git add .
```

```bat
git commit -m "Atualiza Forma com TAF, corrida, pausa e perfil sincronizado"
```

```bat
git push origin main
```

O repositório é `https://github.com/WalysonCaio/forma-fit`.

O `.gitignore` protege `.dev.vars`, `.env`, `node_modules` e arquivos temporários. Nunca adicione chaves reais ao GitHub. Se `git status` listar arquivos com suas chaves, interrompa o envio e confira o `.gitignore`.

Se aparecer `nothing to commit`, os arquivos já estão iguais aos do último commit. Se o push informar alterações remotas, não use `--force`; envie o erro para orientação.

## 5. Publique no Cloudflare

Ainda na mesma janela:

```bat
npm run deploy
```

Se pedir autenticação do Cloudflare:

```bat
npx wrangler login
```

Depois repita `npm run deploy`.

As quatro chaves já cadastradas no Worker permanecem no servidor: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `GEMINI_API_KEY`. Não precisa enviá-las novamente para esta atualização. Se alguma estiver errada, corrija somente essa chave. `SUPABASE_URL` deve ser a raiz `https://SEU-PROJETO.supabase.co`.

A publicação mantém `https://forma-fit.wcaio.workers.dev`.

## 6. Carregue a nova versão

1. Feche todas as abas e janelas instaladas do Forma, inclusive no celular.
2. Abra o aplicativo de novo.
3. No computador, pressione **Ctrl + F5**.
4. Confira se o menu mostra **TAF**, **Corrida** e **Música**.

O aplicativo usa cache de PWA. Se ainda aparecer a interface antiga, feche todas as abas novamente. No computador, uma alternativa é abrir janela anônima. Evite limpar os dados do navegador enquanto houver atividades não sincronizadas.

## 7. Configure seu perfil e a IA

1. Entre com sua conta.
2. Abra **Meu perfil**.
3. Preencha idade, altura, peso, objetivo, experiência, equipamentos, limitações e rotina.
4. Em **Quantos minutos você tem para cada treino?**, informe o tempo disponível para a sessão. De 7h às 8h são 60 minutos; não é tempo de cada exercício.
5. Marque a opção de gerar proposta ao salvar mudanças se desejar esse comportamento automático. Ela autoriza enviar o contexto ao Gemini, sem fotos nem GPS.
6. Salve. Quando a IA terminar, escolha **Revisar última proposta**.
7. Revise e salve cada ficha. Fichas do Gemini de mesmo grupo são atualizadas; fichas manuais são preservadas. Uma sessão já iniciada não é substituída.

Salvar perfil, medidas, alimentos ou metas TAF pode gerar nova proposta quando a opção está ativa. Pedidos próximos são agrupados. A geração usa a cota já existente do Gemini e do aplicativo; não é ilimitada. Se a IA falhar, os dados continuam salvos e suas fichas permanecem disponíveis. Use **Gerar treino atualizado** para tentar novamente.

A assinatura de contexto marca propostas desatualizadas. Mudanças posteriores no perfil, medidas, alimentos ou TAF exigem gerar novamente antes de aplicar a proposta antiga. Alterar apenas o link de música não invalida o treino.

Os dados realmente usados pelo Gemini são: perfil, medidas recentes, fichas, alimentos e metas/agenda TAF. O contexto usa os 100 registros mais recentes desses tipos. Fotos só são enviadas por escolha e autorização específica no Auxiliar. O percurso GPS não integra esse contexto.

A autodescrição de biotipo permanece opcional. Ela não é diagnóstico nem regra automática para volume/carga. O plano considera objetivos, experiência, recuperação, disponibilidade e desempenho.

## 8. Senha e perfil

- Todos os campos de senha têm **Mostrar / Ocultar**.
- **Redefinir senha** no perfil exige senha atual e confirmação da nova senha.
- **Esqueci minha senha** na tela de entrada usa recuperação por e-mail. Quem esqueceu a senha não consegue informar a antiga; a identidade é verificada pelo link recebido.
- **Redefinir perfil** exige senha atual e a palavra REDEFINIR. Limpa objetivos e preferências, preservando nome, usuário, fichas, histórico, fotos e amizades.
- **Excluir perfil e conta** exige senha atual e EXCLUIR. Remove a conta e seus dados de forma definitiva.
- Mudança de nome, usuário e e-mail também mantém verificação pela senha atual.

A confirmação e recuperação por e-mail ainda dependem da configuração de SMTP/modelos do Supabase descrita no guia de publicação original. Esta atualização não configura um provedor de e-mail automaticamente.

## 9. Use a pausa do treino

1. Inicie sua ficha.
2. Clique em **Pausar** para congelar o tempo ativo e o descanso.
3. Enquanto pausado, a marcação de séries fica bloqueada.
4. Clique em **Retomar** para continuar.

O estado da pausa faz parte do rascunho sincronizado. O histórico guarda a duração ativa ao finalizar. A ofensiva continua exigindo finalizar pelo menos três exercícios distintos com todas as séries concluídas.

## 10. Configure o TAF

1. Abra **TAF → Adicionar teste**.
2. Informe concurso, data prevista, nome, meta, unidade, resultado atual e regras do edital.
3. Para barra: unidade repetições e comparação "pelo menos". Para tempo de corrida: unidade segundos/minutos e comparação "até"; descreva a distância nas regras. Para salto: metros/centímetros, "pelo menos".
4. Informe o local e marque se você realmente tem acesso a ele.
5. Selecione os dias disponíveis.
6. Repita para barra, corrida, natação, salto e abdominal conforme seu edital.
7. Clique em **Preparação com IA** ou monte uma agenda manual.
8. Revise, edite ou remova sessões antes de salvar a agenda.

A agenda aparece no TAF e as sessões de hoje aparecem em **Hoje**. Sessões vinculadas a um teste que ficou indisponível deixam de aparecer em Hoje; atualize a agenda. A IA é instruída a respeitar locais e dias, integrar com ABC e evitar duplicação de volume.

Testes de repetições com local Academia podem ser adicionados a uma ficha com **Adicionar à ficha**. Edite/remova depois em **Treinos → Editar**. Natação e salto ficam na agenda externa quando os locais estão disponíveis. Corrida pode ser iniciada pela aba Corrida. A agenda não prova aptidão nem substitui as regras do edital.

Registre as sessões realizadas e atualize o resultado atual do teste para acompanhar a meta. Sessões TAF e corridas têm histórico próprio; não contam artificialmente como três exercícios para a ofensiva.

## 11. Corrida de rua e esteira

**Rua:**

1. No celular, use a URL HTTPS do aplicativo.
2. Abra **Corrida → Iniciar corrida de rua**.
3. Autorize localização precisa no navegador.
4. Espere sinal GPS estável. Teste em área aberta.
5. Mantenha a tela ligada e o aplicativo visível. Quando possível, o Forma pede ao navegador para manter a tela acordada.
6. Use Pausar/Retomar quando necessário.
7. Finalize, confira a distância e salve.
8. Escolha **Compartilhar cartão** para enviar ou baixar a imagem PNG com distância, tempo e ritmo.

O cartão não inclui localização nem nome do usuário. O percurso privado pode ser desenhado durante a atividade, sem serviço de mapas. Não há cobrança adicional de API de mapas/GPS nesta implementação; continuam existindo as condições e cotas dos serviços de hospedagem/banco/IA.

O navegador pode suspender GPS e tela. Ao detectar saída da tela, a corrida de rua pausa. Ao recarregar, a atividade também volta pausada e precisa de retomada explícita. Intervalos longos sem sinal começam novo segmento sem inventar a distância perdida. Não é equivalente ao rastreamento nativo em segundo plano do Strava. Para isso seria necessária uma versão móvel nativa e permissões próprias.

A precisão depende do aparelho, sinal e ambiente. Pontos imprecisos, saltos incompatíveis e pequenas oscilações são filtrados; a distância é estimada. Faça uma atividade curta de validação antes de depender do GPS para medir TAF.

**Esteira:** inicie a atividade, use o cronômetro e informe os quilômetros mostrados pela esteira ao finalizar. GPS não mede adequadamente uma corrida estacionária.

Os rascunhos usam cache por conta neste aparelho e sincronização periódica quando online. Uma nova conta/login inicial exige internet. Para finalizar na conta real, reconecte para salvar. Conflitos entre dispositivos são recusados; recarregue para usar a versão atual da nuvem.

## 12. Música

1. Abra **Música**.
2. Cole um link de vídeo ou playlist do YouTube.
3. Clique em **Carregar player** e use os controles oficiais.
4. O player permanece visível ao navegar dentro do Forma.
5. **Fechar música** remove o player.

É um player de YouTube; não controla a sessão do aplicativo YouTube Music, nem importa sua fila ou conta. Links de vídeos/playlists do music.youtube.com podem ser interpretados como links do YouTube quando compatíveis. Vídeos privados, restritos ou que não permitem incorporação podem falhar. Disponibilidade, anúncios, reprodução automática e segundo plano dependem do YouTube e do navegador. Não há extração de áudio ou player oculto.

## 13. Verificação feita e limites

Foram verificados: 20 testes automatizados, pausa/retomada, filtros GPS com posições simuladas, CRUD TAF, esteira, música persistente na navegação, geração automática consentida, bloqueio de proposta antiga, verificação de senha no servidor, isolamento de dados por usuário, migração repetível e build de publicação Cloudflare em dry-run.

Não foi feita publicação em sua conta por aqui. Não foram usados seus segredos reais. GPS em campo, entrega de e-mails, uma resposta real do seu Gemini e o player YouTube no celular precisam ser verificados depois de publicar. Não há promessa de funcionamento perfeito em todos os aparelhos.
