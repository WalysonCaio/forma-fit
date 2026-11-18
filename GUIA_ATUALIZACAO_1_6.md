# Forma 1.6 — novo visual

Esta versão inclui as funções da 1.5 e a correção de publicação da 1.5.1. Atualiza o frontend e mantém a estrutura do banco.

## O que mudou

- Visual grafite e verde, ícones SVG consistentes, tipografia, cartões e formulários padronizados.
- Celular com barra inferior: Hoje, Treinos, Alimentação, Evolução e Mais. Em Mais estão TAF, Corrida, Amigos, Auxiliar, Notificações, perfil e saída.
- Dashboard dá destaque à sessão e à constância antes das opções do calendário.
- Textos revisados, incluindo avisos de revisão da dieta e orientações do calendário com ficha D.
- Melhor adaptação dos formulários, tabelas, séries, imagens de execução e janelas. Campos de 16 px e controles com pelo menos 44 px.
- Indicação acessível da aba atual, rótulos para ícones, título das janelas e foco no conteúdo ao navegar. Preferência por movimento reduzido respeitada.
- Nova versão do cache para atualizar o aplicativo instalado.

## Atualizar no seu computador

1. Baixe Forma_App.zip e extraia em uma pasta separada, por exemplo em Downloads.
2. Abra a pasta `forma` extraída. Copie o conteúdo dela para `C:\Users\Walyson Caio\Documents\forma`, aceitando substituir os arquivos existentes.
3. Preserve sua pasta `.git`, o arquivo `.dev.vars` e qualquer configuração pessoal. Não apague sua pasta do projeto antes de copiar. O pacote não contém suas chaves reais.
4. Abra o CMD e execute um comando por vez:

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

Se a checagem e os testes terminarem sem falhas:

```bat
npm run deploy
```

Não precisa executar SQL, restaurar o banco, criar conta novamente ou reenviar as chaves do Cloudflare para esta atualização.

5. No computador abra https://forma-fit.wcaio.workers.dev e pressione Ctrl + F5. Se aparecer o aviso de nova versão do aplicativo, aceite a atualização. No celular feche e abra o aplicativo após o carregamento da atualização; se o visual antigo continuar, compare abrindo o endereço em uma aba anônima antes de limpar dados locais. Não limpe dados do navegador se houver um treino em rascunho ainda não sincronizado.
6. Entre com seu usuário e confira Hoje, Treinos, Alimentação e Mais. No celular, abra Mais para encontrar o TAF, a corrida e seu perfil.

## Salvar no GitHub

Depois de conferir a atualização, no mesmo CMD:

```bat
git add .
```

```bat
git commit -m "Atualiza visual e navegacao responsiva do Forma"
```

```bat
git push
```

## Validação e limites

47 testes passaram no ambiente local, incluindo autenticação, CRUD, banco com políticas, rotina de treino, alimentação e inicialização real do Worker no workerd. A suíte de interface também verifica o menu Mais: abrir TAF e perfil, fechar o menu ao navegar, preservar registros e marcar a aba ativa. JavaScript e sintaxe CSS foram conferidos.

Os testes de interface usam DOM simulado. Não houve validação visual em navegador real ou em aparelhos físicos nesta atualização. Confira a apresentação no seu celular após publicar. A publicação e os serviços reais da sua conta dependem de executar o deploy no seu computador; não foram acessados para esta revisão.
