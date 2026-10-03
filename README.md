# Forma — treino e alimentação

Aplicativo web pessoal com múltiplas contas, fichas ABC, registro de séries, alimentação, despensa, medidas, fotos privadas, amizades e auxiliar Gemini. Interface em português, adaptada ao celular. Instalável como PWA.

**Comece pelo [GUIA_PUBLICACAO.md](GUIA_PUBLICACAO.md).**

## Executar

Requer Node.js moderno compatível com Wrangler (Node 22 ou superior) e npm.

```sh
npm ci
npm run dev
```

Sem configuração, use **Explorar demonstração**. Os dados dessa opção ficam apenas no navegador. Para login e persistência reais, execute `supabase.sql` em um projeto novo, copie `.dev.vars.example` para `.dev.vars` e preencha suas chaves privadas. Não envie `.dev.vars` para GitHub.

```sh
npm test
npm run check
npx wrangler deploy --dry-run
```

## Implementado

- Login por e-mail/senha, confirmação por e-mail e recuperação por link de uso único.
- Sessão em cookies HttpOnly, Secure em HTTPS, SameSite; tokens não são devolvidos à interface.
- Nome e @usuário editáveis com verificação da senha atual. Alteração de e-mail/senha e exclusão de conta exigem a senha atual; recuperação por e-mail é a exceção.
- CRUD de fichas e exercícios, refeições, despensa, medidas, sessões e fotos. Convites podem ser criados, aceitos e removidos.
- Treino em andamento: cargas/repetições por série, marcação, descanso e duração baseados em timestamps. F5 preserva o rascunho e os relógios quando a conta consegue carregar.
- Últimas cargas/repetições da mesma ficha são sugeridas na próxima sessão.
- Rascunho persistido no Supabase e cópia temporária local para conexão interrompida. Conflitos de versão rejeitam sobrescritas silenciosas. Há escolha explícita entre rascunho e nuvem.
- Ofensiva: pelo menos 3 exercícios distintos, com todas as séries concluídas e repetições válidas. Só conta depois de **Finalizar**. Um dia pode contar apenas uma vez. Contagem diária no fuso de Brasília. Dias consecutivos de calendário; descanso não é penalizado com notificações ou cobranças, mas interrompe a sequência.
- Amigos: busca por @usuário, aceitação bilateral e compartilhamento opcional de ofensiva/total/treinou hoje. E-mail, medidas, dieta e fotos permanecem privados.
- Fotos: bucket privado, RLS por proprietário, URLs assinadas por 120 segundos, até 8 MB, JPG/PNG/WebP. A interface reprocessa a imagem para remover metadados antes do envio.
- Gemini: conversa, proposta ABC, uma ficha, alimentação do dia ou uma refeição. Propostas revisadas e salvas pelo usuário, com execução/finalidade/alternativas.
- Contexto enviado à IA apenas com consentimento por pedido. Foto exige consentimento separado e escolha explícita.
- Biotipo coletado como autodescrição, inclusive “Não sei”. O auxiliar explica limites e identifica necessidades pelo histórico, sem diagnosticar somatotipo ou gordura por fotos.
- Ditado e leitura em voz pelo navegador. **Não inclui Gemini Live nem voz nativa do Gemini.** Compatibilidade varia; o provedor do navegador pode processar áudio.
- PWA com cache dos arquivos da interface. A sessão inicial e a sincronização exigem internet; não é um modo offline completo.

## Estrutura

- `public/`: interface, estilos, dados de exemplo, ícone, PWA.
- `worker.mjs`: API, autenticação, autorização, fotos e Gemini.
- `supabase.sql`: tabelas, regras RLS, funções, ofensiva e armazenamento privado.
- `tests/`: testes de API, banco PostgreSQL em PGlite e interface em DOM simulado.
- `wrangler.jsonc`: publicação Cloudflare Workers com Static Assets.

Não há framework de frontend nem CDN de scripts. O navegador chama apenas a API do próprio aplicativo. Segredos ficam no Worker. O banco utiliza o JWT do usuário em operações normais; a chave administrativa só serve para exclusão de conta e assinatura de autorização de recuperação.

## Verificação e limites

A migração foi executada em PostgreSQL via PGlite com os esquemas Auth/Storage simulados. Foram verificadas políticas de isolamento, convites, consentimento, cálculo da ofensiva, quota atômica de IA e proteção do armazenamento. Os testes de API usam respostas Supabase simuladas. A interface foi exercitada em DOM simulado: navegação, criação de alimento, conclusão de treino, ofensiva e restauração do rascunho/descanso. O bundle passou por `wrangler deploy --dry-run`.

**Não houve teste integrado com credenciais reais do Supabase/Gemini, publicação em conta Cloudflare, teste de e-mails reais nem inspeção visual em navegador real.** O ambiente não disponibilizou a prévia de navegador deste projeto. Execute a verificação de duas contas indicada no guia antes de compartilhar.

Esta versão não inclui cálculo nutricional por tabela alimentar licenciada/verificada, vídeos de execução, diagnóstico corporal, chat de voz contínuo, importação de plano por PDF, notificações push nem APK nativo. Nutrientes eventualmente sugeridos pela IA são estimativas; confirme com profissional. Fotos e medidas não permitem confirmar a avaliação corporal colada de outra conversa.

## Projeto pessoal

Exemplos ABC são educativos e têm volume moderado; não são uma prescrição individual. Use experiência, tolerância, recuperação e orientação profissional para ajustar. A meta de peso é registrada como objetivo do usuário, sem promessa de prazo ou composição corporal. Ofensiva não é incentivo para ignorar recuperação.
