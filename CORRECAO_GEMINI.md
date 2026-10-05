# Correção do aviso genérico do Gemini

A mensagem anterior não mostrava a causa real. Esta correção diferencia chave recusada, restrições da chave, modelo indisponível, limite/cota, falha temporária e tempo de resposta excedido. Não devolve a chave nem o texto bruto do Google ao navegador.

## Atualizar somente o servidor

1. Extraia o ZIP atualizado.
2. Copie somente o arquivo `forma/worker.mjs` do ZIP para `C:\Users\Walyson Caio\Documents\forma\worker.mjs`, substituindo o existente.
3. Abra o CMD e execute:

```bat
cd /d "C:\Users\Walyson Caio\Documents\forma"
npm run deploy
```

4. Abra o Forma, pressione Ctrl + F5 e tente gerar uma proposta uma vez.
5. Leia a nova mensagem e envie somente esse erro para orientar a correção da configuração.

Não precisa executar SQL nem alterar seu perfil para esta correção. O modelo configurado continua sendo o mesmo; esta etapa não muda de modelo silenciosamente nem ativa cobrança.

## Como interpretar

- **Chave Gemini recusada:** confira o segredo GEMINI_API_KEY no Worker. Use uma chave do Google AI Studio. Não envie a chave no chat.
- **Restrições bloqueando Cloudflare:** a chamada vem do servidor, não diretamente do domínio do navegador. Confira as restrições de aplicação e da API no projeto Google.
- **Modelo não encontrado ou indisponível:** confira GEMINI_MODEL em wrangler.jsonc e os modelos habilitados para o projeto. A documentação atual limita o acesso à família 2.5 para projetos novos; confira antes de escolher outro modelo.
- **Cota/limite do projeto Gemini:** confira limites e utilização no Google AI Studio. A cota Google é diferente do limite de 20 pedidos do Forma. Não habilite pagamento sem verificar custo e necessidade.
- **Falha temporária/timeout:** aguarde antes de repetir. Os dados e fichas continuam salvos.

Documentação consultada em 05/10/2026:
https://ai.google.dev/gemini-api/docs/models
https://ai.google.dev/gemini-api/docs/api-key

Verificação: 15 testes do servidor passaram, incluindo resposta simulada de chave inválida e confirmação de que a chave não aparece no erro. Build Cloudflare em dry-run passou. Sem acesso à chave e ao projeto reais, não foi possível confirmar a causa da falha de sua conta.
