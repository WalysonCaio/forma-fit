# Forma 1.2 — atualização do aplicativo já publicado

Este pacote atualiza seu Forma no GitHub, Cloudflare e Supabase. Os serviços e as chaves já configurados continuam sendo usados. Não precisa criar outro repositório nem outro banco.

## 1. Prepare a pasta no Windows

1. Termine ou salve o treino e a corrida em andamento. Saia do aplicativo.
2. No Explorador de Arquivos, abra `C:\Users\Walyson Caio\Documents`.
3. Copie a pasta `forma` para uma pasta de backup chamada `forma_backup_antes_1_2`.
4. Baixe e extraia `Forma_App.zip` em outra pasta, por exemplo Downloads.
5. Abra a pasta `forma` dentro do ZIP extraído.
6. Copie todo o conteúdo dela para `C:\Users\Walyson Caio\Documents\forma`.
7. Quando o Windows perguntar, escolha substituir os arquivos existentes.

Preserve a pasta `.git`, seu arquivo `.dev.vars` e suas chaves. O ZIP não contém chaves reais, pasta `.git` nem `node_modules`. Não renomeie `.dev.vars.example` para substituir suas configurações existentes.

## 2. Atualize o banco existente

1. Abra o painel do Supabase e selecione o projeto `forma-fit`.
2. Abra **SQL Editor**.
3. Clique em **New query**.
4. No Windows, abra o arquivo `ATUALIZACAO_1_2.sql` da pasta `forma` com o Bloco de Notas.
5. Copie todo o conteúdo e cole na nova consulta.
6. Clique em **Run** e espere a confirmação de sucesso.

Use `ATUALIZACAO_1_2.sql` para atualizar. Não execute novamente o `supabase.sql` completo, que é para instalação inicial.

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
4. Confira se o menu mostra **TAF**, **Corrida** e **Alimentação**, sem a aba Música.

O aplicativo usa cache de PWA. Se ainda aparecer a interface antiga, feche todas as abas novamente. No computador, uma alternativa é abrir janela anônima. Evite limpar os dados do navegador enquanto houver atividades não sincronizadas.

## 7. Como usar as mudanças desta versão

### TAF sem campos genéricos

Abra TAF → Cadastrar provas. Informe o concurso e marque as modalidades. Cada seleção abre somente os campos daquela prova. Para os exemplos que você enviou:

| Modalidade | Preencha |
|---|---|
| Barra fixa | Mínimo de 5 repetições |
| Salto em distância | Distância mínima de 3,60 metros |
| Natação | Distância de 50 metros; máximo 1 minuto e 0 segundos |
| Abdominal | Nome: abdominal remador; mínimo de 40 repetições; limite de 1 minuto |
| Corrida | Distância de 2400 metros; máximo 11 minutos e 30 segundos |

Os valores acima são seus exemplos, não confirmação das regras oficiais. Copie as regras do edital do seu concurso, incluindo execução, tentativas e critérios, no campo de observações.

Para cada prova, marque se você tem como treiná-la, escolha o local e os dias. Natação e salto sem local disponível ficam fora da preparação diária. Salve e clique em Gerar preparação com IA. Revise as sessões propostas antes de aplicá-las. A agenda aparece na tela Hoje junto da musculação. Ao alterar metas, dias ou disponibilidade, gere novamente para atualizar a preparação. Se autorizar a atualização automática no perfil, o aplicativo solicita uma nova proposta após mudanças; ele não substitui as fichas silenciosamente.

Registrar resultado é separado de cadastrar o edital. Corrida e natação precisam atingir a distância e respeitar o tempo; abdominal precisa atingir as repetições dentro do tempo. Metas antigas ficam preservadas e podem ser editadas para o novo formato.

### Alimentação: perfil, cardápio e consumo

1. No perfil, complete idade, altura, peso atual, peso desejado, atividade diária e sexo usado na fórmula energética. Escolha ganhar, perder, manter ou automático pelo peso desejado. A atividade inclui o dia inteiro, não apenas treinar seis vezes por semana. Você pode informar uma meta calórica definida com profissional e ajustar líquidos.
2. Em Alimentação → Alimentos e despensa, registre os alimentos disponíveis ou compráveis. Colar só uma lista alimenta a despensa, mas não informa porções de uma refeição.
3. Clique Montar dieta com IA. Autorize o envio dos dados e revise a proposta. São necessárias chave, cota e modelo Gemini válidos; demonstração não acessa a IA real.
4. Em Registrar refeição, cole um alimento por linha ou separe por ponto e vírgula. Exemplo: `3 ovos cozidos; 200 g de arroz cozido; 150 g de frango grelhado`.
5. Clique Ler alimentos e porções. Confira o alimento, preparo e peso. Ovo em unidade aproxima 50 g comestíveis; banana precisa de peso. Óleos, molhos e recheios também entram na conta. Se algo não for identificado, escolha manualmente ou cadastre o rótulo.
6. A tabela mostra calorias, proteínas, carboidratos e gorduras por alimento e o total. Gorduras e lipídios são o mesmo grupo. Valores são estimativas, não análise laboratorial da sua comida.
7. Refeições planejadas aparecem no Cardápio. Elas só contam no Meu dia depois de registrar como consumidas. Escolha a data para consultar o histórico. Edite ou exclua registros quando necessário.
8. Use +250 ml ou Registrar outra quantidade para acompanhar líquidos. A referência inicial não é um mínimo obrigatório; ajuste conforme orientação, exercício, calor e suas necessidades.
9. Em Receitas, escolha sugestões, ajuste as porções e salve no cardápio ou registre o consumo. Receita isolada não garante ganho ou perda de peso.

A base inclui 21 alimentos/preparos da TACO (NEPA/UNICAMP, 4ª edição, 2011). Para marcas ou preparos ausentes, cadastre os nutrientes do rótulo e seu peso de referência. Não foram inventados valores de calabresa, mortadela ou tapioca. O histórico consumido guarda uma cópia dos nutrientes usados, preservando a conta quando um alimento personalizado muda.

### Como são estimadas as metas

O gasto de repouso usa Mifflin–St Jeor e um fator de atividade para estimar manutenção. O ponto de partida automático acrescenta 250 kcal para ganho ou reduz até 300 kcal (limitado a 15% da manutenção) para perda. Proteína inicia em 1,6 g/kg, gorduras em aproximadamente 30% da meta energética e carboidratos no restante. São escolhas iniciais ajustáveis, não uma prescrição individual nem promessa de ganho de massa. Revise a tendência real de peso, recuperação e medidas; condições clínicas ou necessidades especiais exigem avaliação profissional.

A referência de bebidas usa 3 L para homens e 2,2 L para mulheres, com ajuste manual. Não contabiliza água dos alimentos. Não é uma necessidade fixa para cada pessoa.

Fontes dos métodos e dados: TACO/NEPA (https://nepa.unicamp.br/tabela-brasileira-de-composicao-de-alimentos-4a-edicao/); Mifflin et al., 1990 (https://pubmed.ncbi.nlm.nih.gov/2305711/); ISSN, proteína e exercício (https://pubmed.ncbi.nlm.nih.gov/28642676/); National Academies, Dietary Reference Intakes for Water, 2004 (https://nap.nationalacademies.org/catalog/10925/).

### Corrida, tela bloqueada e Música

A aba Música foi removida. A corrida de rua continua usando o GPS autorizado pelo navegador. **Não conte com o rastreamento de tela bloqueada:** ao sair da página, esta versão pausa a atividade para não inventar distância. Mantenha o aplicativo visível e retome quando voltar. O recurso de manter a tela acesa depende do navegador. Instalar como PWA não transforma o aplicativo em nativo nem garante GPS em segundo plano. Para rastrear de forma confiável bloqueado, será necessária uma versão nativa com permissão de localização em segundo plano.

### Verificação após publicar

Entre com sua conta, confira as fichas antigas, cadastre uma prova de corrida, registre uma refeição e 250 ml de água. Saia e entre novamente para verificar persistência. Confira outro usuário para verificar que os registros pessoais não aparecem para ele. A validação local passou com 27 testes automatizados; a publicação e as credenciais reais devem ser verificadas no seu ambiente.
