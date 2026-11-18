# Forma 1.5.1 — correção da publicação Cloudflare

O erro 10021 vinha de IDs aleatórios gerados ao montar o catálogo de exercícios durante a importação do módulo pelo Worker. O catálogo agora usa uma fábrica sem IDs; fichas reais continuam gerando IDs únicos somente quando são criadas.

## Atualize no Windows

1. Baixe o novo Forma_App.zip e extraia em Downloads, em uma pasta separada.
2. Abra a pasta forma extraída e copie o conteúdo para `C:\Users\Walyson Caio\Documents\forma`, aceitando substituir.
3. Preserve `.git`, `.dev.vars` e as configurações pessoais. O ZIP não contém chaves reais.
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

```bat
npm run deploy
```

As três chaves enviadas com sucesso permanecem no Worker. Não precisa reenviá-las, restaurar o banco nem executar SQL por causa desta correção. Não é necessário atualizar o Wrangler para resolver este erro.

Depois da publicação, abra https://forma-fit.wcaio.workers.dev em uma janela anônima para não reutilizar a sessão do banco antigo. Entre com o e-mail e a senha antigos do Forma, não com a senha do PostgreSQL.

Se funcionar, confira seu perfil e os registros restaurados. A configuração de envio de e-mail e URLs de autenticação do Supabase novo ainda deve ser conferida separadamente.

Para salvar a correção no GitHub:

```bat
git add .
git commit -m "Corrige inicialização do Worker no Cloudflare"
git push
```

## Validação

Além dos testes anteriores, há teste que importa o Worker com geração aleatória, rede e timers globais proibidos, teste que preserva a unicidade dos IDs das fichas e teste que compila e executa o Worker no runtime local workerd. Este último recebeu HTTP 200 de uma requisição servida pelo Worker corrigido. A publicação na sua conta depende do comando npm run deploy no seu computador.
