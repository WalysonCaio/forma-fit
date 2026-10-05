# Forma 1.3 — atualização passo a passo

## 1. Substitua os arquivos

1. Termine e sincronize treino ou corrida em andamento e feche o Forma.
2. Faça uma cópia da pasta `C:\Users\Walyson Caio\Documents\forma`, chamada `forma_backup_antes_1_3`.
3. Extraia o novo `Forma_App.zip` em Downloads.
4. Abra a pasta `forma` extraída e copie todo seu conteúdo para `C:\Users\Walyson Caio\Documents\forma`.
5. Aceite substituir arquivos. Preserve sua pasta `.git` e o arquivo `.dev.vars`. O pacote não contém chaves reais.

## 2. Banco Supabase

Se você já executou `ATUALIZACAO_1_2.sql`, não há nova alteração do banco nesta versão.

Se ainda não executou: abra Supabase → seu projeto → SQL Editor → New query. Abra `ATUALIZACAO_1_2.sql` no Bloco de Notas, copie tudo, cole no SQL Editor e clique Run. Essa atualização preserva os registros e pode ser repetida. Não execute o arquivo `supabase.sql` completo no banco existente.

## 3. Confira no CMD

Abra o CMD. Execute um comando por vez, esperando terminar:

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

Os 30 testes devem passar. Se algum falhar, copie a mensagem antes de publicar.

## 4. Atualize GitHub

Na mesma janela:

```bat
git add .
```

```bat
git commit -m "Atualiza corrida TAF, receitas e metas do perfil"
```

```bat
git push
```

Não use force push. Se disser que não há alterações para salvar, confira se substituiu os arquivos na pasta correta.

## 5. Publique no Cloudflare

```bat
npm run deploy
```

Caso solicite login:

```bat
npx wrangler login
```

Depois repita `npm run deploy`. As chaves já cadastradas no Worker permanecem no servidor. Seu endereço continua `https://forma-fit.wcaio.workers.dev`.

## 6. Abra a nova versão

Feche todas as abas e janelas instaladas do Forma, inclusive no celular. Abra de novo. No computador pressione Ctrl + F5. Se o cache ainda mostrar a versão antiga, feche todas as abas novamente; pode testar numa janela anônima. Não limpe dados de uma atividade não sincronizada.

## 7. Configure corrida do TAF

TAF → Editar regra da corrida → Onde vai se preparar?

- Rua: preparação de rua.
- Esteira: preparação na academia.
- Rua e esteira: revela escolhas por dia da semana.

Exemplo: segunda Esteira, quarta Rua, sábado Rua e esteira. Neste último caso você decide no dia, sem duplicar a sessão. Marque somente os dias em que pode treinar. A prova do edital continua com a mesma distância e tempo: mudar o local de preparação não altera a regra oficial. Desempenho na esteira não garante o mesmo desempenho na prova de rua.

Salve. Gere uma nova preparação com IA ou edite a agenda existente. Se uma sessão antiga usa um local que deixou de estar permitido, ela fica indisponível até ser ajustada. A agenda válida aparece junto da musculação na tela Hoje. O planejamento enviado à IA pede alternância de locais, respeito ao tempo e recuperação e permite corrida depois da musculação. A proposta precisa ser revisada antes de salvar.

Para registrar a corrida, abra Corrida e inicie o modo correto: rua com GPS; esteira com distância informada ao finalizar. Esta versão web não garante GPS com celular bloqueado. Ao sair da página a corrida pausa; retome ao voltar.

## 8. Configure perfil e alimentação

Abra Meu perfil:

1. Complete idade, altura, peso de referência, meta de peso, objetivo alimentar, sexo usado na fórmula e atividade do dia inteiro.
2. A medida de peso mais recente, quando existente, tem preferência sobre o peso de referência do perfil. Para atualizar seu peso atual, registre a medida com a data correta em Evolução.
3. Informe o horário do treino em dias úteis e no fim de semana, se quiser sugestões de horário de refeições.
4. Opcionalmente informe meta calórica e líquidos definidos para você. A referência automática de líquidos é ajustável; não é mínimo obrigatório.
5. Em Alimentos que não quero nas sugestões, marque ingredientes a excluir. Receitas com esses ingredientes saem das sugestões. A IA recebe essas preferências; confira cada proposta, rótulo e preparo.
6. Salve.

Alimentação → Meu dia mostra IMC, peso usado, manutenção estimada, meta calórica, macros e líquidos. Evolução também mostra IMC. A categoria do IMC é referência para adultos a partir de 20 anos; não identifica percentual de gordura nem diferencia músculo de gordura. Ela não muda automaticamente seu objetivo.

Alimentação → Receitas ou Pré e pós-treino usa a meta atual para dimensionar porções e recalcula a tabela nutricional. Sugestões de ganho usam o objetivo de ganho; perda usa o objetivo de perda. Um mesmo prato pode servir para objetivos diferentes com porções diferentes. Isso não é uma garantia de efeito: o total consumido ao longo do dia e a evolução real precisam ser acompanhados.

As porções sugeridas destinam uma fração da meta diária à refeição (12% para pré, 25% para pós), com limites de escala. Essa divisão é uma escolha prática inicial do aplicativo, não uma regra clínica. Edite conforme fome, digestão e restante das refeições. Refeições grandes antes de treinar podem precisar de mais intervalo. Sugestão de horário: pré 90 minutos antes; pós 30 minutos após o tempo previsto da sessão. Os horários são editáveis; o aplicativo não mede automaticamente seu término do treino para agendar comida.

Não some todas as sugestões ao cardápio: escolha opções para substituir refeições. A refeição só conta nos totais de consumo quando você a registrar como consumida. Calorias, carboidratos, proteínas e gorduras incluem os ingredientes e porções confirmados; óleos e molhos extras também precisam entrar.

Quando mudar perfil, peso, alimentos ou metas TAF, as sugestões abertas são recalculadas. Receitas salvas no cardápio recebem aviso de mudança: clique Atualizar porções pelo perfil, revise e salve. Refeições geradas com IA recebem aviso para gerar dieta atualizada. Refeições manuais continuam editáveis. O histórico consumido mantém seus valores originais. Treinos e agenda TAF só mudam após revisar e aplicar nova proposta, preservando a sessão em andamento.

## 9. Suas estimativas de exemplo

Para 90 kg, 181 cm, 28 anos: IMC = 90 ÷ 1,81² = 27,47. O IMC cai na faixa de sobrepeso da classificação adulta, mas não informa quanto é músculo ou gordura.

Se selecionar sexo masculino e atividade moderada, a fórmula do aplicativo estima manutenção de 2.939 kcal e ponto de partida de 3.189 kcal para ganho. Isso é um cenário calculado, não uma necessidade medida: trabalho, deslocamentos, rotina real e mudança de peso ajudam a ajustar. Se o nível de atividade estiver diferente, o resultado será diferente. Não escolha um fator maior apenas por treinar seis vezes por semana.

A referência inicial de bebidas para masculino é 3 L/dia (feminino 2,2 L), sem contar água dos alimentos. Exercício e calor podem modificar necessidades. Você pode ajustar o valor no perfil, sem tratar a referência como uma obrigação de beber um volume fixo.

## 10. Validação e fontes

Passaram 30 testes automatizados de cálculos, interface, TAF, migração, isolamento de usuários, autenticação, histórico e sincronização de propostas, além da preparação de publicação Cloudflare em modo simulado. Isso não certifica ausência de qualquer erro. Credenciais reais de Gemini, publicação, e-mail e GPS em cada celular devem ser verificados no seu ambiente.

Métodos: Mifflin–St Jeor para repouso com fator de atividade; ganho inicial +250 kcal, perda de até 300 kcal limitada a 15% da manutenção; proteína inicial 1,6 g/kg; gorduras cerca de 30% das calorias e carboidratos no restante. Os valores são estimativas ajustáveis. A base dos alimentos é TACO/NEPA UNICAMP, com alimentos personalizados por rótulo.

Fontes:
- IMC e limitações: https://www.cdc.gov/bmi/faq/index.html
- Mifflin et al.: https://pubmed.ncbi.nlm.nih.gov/2305711/
- Água, National Academies: https://nap.nationalacademies.org/catalog/10925/
- Pré/pós e importância do total nutricional: https://pmc.ncbi.nlm.nih.gov/articles/PMC5596471/
- TACO: https://nepa.unicamp.br/tabela-brasileira-de-composicao-de-alimentos-4a-edicao/
