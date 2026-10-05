# Forma 1.4 — atualização passo a passo

## 1. Substitua os arquivos

1. Termine e sincronize treino ou corrida em andamento e feche o Forma.
2. Faça uma cópia da pasta `C:\Users\Walyson Caio\Documents\forma`, chamada `forma_backup_antes_1_4`.
3. Extraia o novo `Forma_App.zip` em Downloads.
4. Abra a pasta `forma` extraída e copie todo seu conteúdo para `C:\Users\Walyson Caio\Documents\forma`.
5. Aceite substituir arquivos. Preserve sua pasta `.git` e o arquivo `.dev.vars`. O pacote não contém chaves reais.

## 2. Atualize o banco Supabase

Esta versão adiciona notificações privadas. Mesmo que você já tenha executado o SQL 1.2, execute agora **ATUALIZACAO_1_4.sql**:

1. Abra Supabase → seu projeto → SQL Editor → New query.
2. No Windows, abra `ATUALIZACAO_1_4.sql` com o Bloco de Notas.
3. Copie todo o conteúdo e cole na nova consulta.
4. Clique Run e aguarde sucesso.

O arquivo preserva os registros e políticas existentes, aceita também todos os tipos anteriores e pode ser repetido. Não execute o `supabase.sql` completo no banco existente.

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
git commit -m "Corrige revisão da IA e adiciona notificações"
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

## 7. Como revisar e aplicar dieta e treino

1. Abra Alimentação → Montar dieta com IA, ou Treinos → Auxiliar IA para solicitar treino.
2. Autorize o envio do contexto quando solicitado.
3. Durante o pedido, aparece um aviso de geração. Você pode navegar entre as abas enquanto essa janela do aplicativo permanecer aberta. Evite recarregar ou fechar a página durante o pedido: ainda não é um trabalho executado em fila no servidor.
4. Ao terminar, a Alimentação mostra **Revisar e aplicar** para dieta. Treinos/Hoje mostram o botão para o plano de treino. O sino também indica a nova resposta.
5. Clique no botão ou abra Sino → Propostas salvas → Abrir revisão.
6. Se houver vários itens, clique **Revisar e salvar** em cada ficha/refeição. O botão passa a indicar que aquele item já foi salvo.
7. Na dieta, confira alimentos, preparo, peso e tabela nutricional; marque a confirmação e clique Salvar. A refeição entra no Cardápio, sem contar automaticamente como consumida.
8. No treino, confira exercícios, séries, repetições e execução, ajuste e clique Salvar. A ficha aparece na aba Treinos.
9. O aviso de proposta pendente desaparece quando todos os itens são salvos ou quando você clica Dispensar proposta. A proposta permanece no histórico do sino.

Os botões fazem ações reais. O problema anterior era a falta de acesso visível à revisão na Alimentação e o aviso exibido permanentemente. Agora o aviso aparece somente enquanto gera, quando há falha ou proposta pendente. Se mudar perfil, medidas, alimentos ou TAF depois de gerar, a proposta antiga continua bloqueada para aplicação: gere novamente com os dados atuais.

Se a IA responder com perguntas e sem proposta, abra a resposta no sino/Auxiliar, complete os dados pedidos e gere novamente. O aplicativo não cria um botão de aplicar para uma resposta que não contém treino ou dieta utilizável.

## 8. Gemini demorando

O prazo local passou de 55 segundos para 120 segundos. Isso não garante a disponibilidade do Gemini: modelo, cota, conexão e demora do serviço ainda podem impedir a resposta. A falha aparece no aplicativo e no sino com Tentar novamente. Seus dados permanecem salvos. Não clique várias vezes: a geração em andamento bloqueia novos pedidos dos controles de planejamento.

Se a resposta for truncada por limite de tamanho, o aviso orienta pedir uma ficha ou refeição por vez no Auxiliar. Nenhuma alteração é aplicada como se um pedido incompleto tivesse sido bem-sucedido.

## 9. Sino e lembretes

O sino mostra a quantidade de avisos não lidos. É possível ler avisos, marcar todos como lidos, abrir a proposta e excluir avisos. Treino e dieta têm propostas separadas: gerar um treino não apaga a dieta anterior. Os avisos/propostas ficam no banco privado da sua conta, inclusive o estado de leitura.

Para lembretes: Meu perfil → informe horário de treino nos dias úteis e fim de semana → Lembretes dentro do aplicativo → habilite e marque os dias → Salvar. O aplicativo verifica a rotina enquanto está aberto e cria no máximo um aviso por dia. Não lembra quando o dia já está concluído na ofensiva. Dias de descanso não devem ser marcados apenas para prolongar sequência.

**Limite desta versão:** lembretes são dentro do aplicativo e precisam de uma página aberta/ativa. Não há notificações push com o aplicativo fechado nem garantia de entrega em segundo plano. Isso exige configuração de inscrição push e envio pelo servidor. O sino de resposta pronta também depende de o pedido terminar e ser salvo; fechar a página durante geração pode interrompê-lo.

## 10. Fichas A–D e celular

Fichas são ordenadas por A, B, C, D e depois outros grupos, com nome como desempate. Para usar D: Treinos → Criar ficha ou Editar → Grupo D → confira os exercícios → Salvar. Fichas com D usam rotação a partir do último grupo de treino concluído, evitando reiniciar sempre em A toda segunda-feira. Você ainda pode iniciar a ficha que quiser; respeite a recuperação.

Foram ajustados largura de cards, quebra de texto, ações, tabelas com rolagem, abas horizontais, cabeçalho e modais em telas pequenas. Os testes de interface usam navegador simulado; confira a apresentação no seu celular após publicar. GPS, ditado, fotos e integração real com Gemini dependem de recursos/permissões do aparelho e credenciais reais.

## 11. Verificação rápida depois de publicar

1. Confira se o sino aparece.
2. Gere uma dieta, abra a revisão e salve uma refeição. Confira no Cardápio.
3. Gere um treino, revise e salve uma ficha. Confira Treinos.
4. Saia e entre para confirmar propostas/avisos salvos.
5. Ative lembrete num dia escolhido e confira o horário no perfil.
6. Abra cada aba no celular e teste edição e pausa de uma sessão.

Passaram os 30 testes automatizados, incluindo o fluxo completo de gerar/revisar/salvar dieta com resposta simulada, registro das ações dos botões em todas as abas, avisos privados, leitura, lembrete sem repetição, opção D e migração repetível. Isso não garante ausência de erros nem certifica o Gemini real. As credenciais não estão disponíveis no ambiente de teste. A preparação Cloudflare em modo simulado também passou.
