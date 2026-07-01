# Askemata

Site estático, tipografado em Latin Modern (a fonte usada pelo LaTeX), cujo conteúdo é inteiramente abastecido por arquivos Markdown. Não há etapa de build: edite os `.md`, publique a pasta, pronto.

## Estrutura

```
askemata/
├── index.html                → shell da página, único HTML do site
├── content/
│   ├── menu.md                → menu superior, sumário lateral e rodapé
│   └── pages/
│       ├── inicio.md
│       ├── sobre.md
│       ├── exemplo-artigo.md
│       ├── guia-como-usar.md
│       └── guia-exportar-pdf.md
└── assets/
    ├── css/  (style.css, print.css, fonts.css)
    ├── js/   (app.js)
    └── fonts/ (Latin Modern, formato woff2)
```

## Como publicar

Qualquer hospedagem de arquivos estáticos serve: GitHub Pages, Netlify, Vercel (modo estático), ou até um servidor comum. Basta enviar a pasta inteira — nenhum comando de build é necessário.

## Como criar uma página nova

Veja o guia dentro do próprio site: `?p=guia-como-usar`. Resumo:

1. Crie `content/pages/meu-slug.md` com um cabeçalho YAML (`title`, `author`, `date`, `abstract`, `keywords`, `language`).
2. Escreva o conteúdo em Markdown normal.
3. Adicione `- [Texto do link](meu-slug)` em `content/menu.md`, na seção desejada.

## Sobre indexação no Google Scholar — leia antes de publicar um acervo real

Este modelo prioriza a simplicidade de edição (zero build, zero código) sobre a indexabilidade acadêmica máxima. Isso tem uma consequência técnica importante:

O robô do Google Scholar não executa JavaScript de forma confiável. Como este site monta cada página *no navegador* a partir do Markdown, o HTML que o robô recebe na primeira requisição não contém o texto do artigo nem as tags `citation_*` — elas só existem depois que o JavaScript roda. Na prática, isso significa que **os artigos publicados aqui têm chance real de não aparecer nos resultados do Google Scholar**, mesmo com os metadados corretos no cabeçalho de cada `.md`.

O que este modelo já faz para mitigar isso, dentro do limite de "sem build":

- Os metadados (`citation_title`, `citation_author`, `citation_publication_date`, resumo, palavras-chave, DOI) são injetados dinamicamente no `<head>` a cada página — ajuda buscadores comuns (Google, Bing), que em geral executam JavaScript.
- Um bloco JSON-LD (`schema.org/ScholarlyArticle`) é gerado do mesmo jeito, como reforço para outros indexadores.

O que este modelo **não** resolve:

- O conteúdo textual do artigo não está presente no HTML bruto — só depois da execução do JavaScript.
- Não há `sitemap.xml` gerado automaticamente (pode ser mantido manualmente, se necessário).

### Caminho de migração, se a indexação se tornar prioridade

Se no futuro a indexação acadêmica for mais importante do que a edição sem build, a estrutura de conteúdo (`content/menu.md` e `content/pages/*.md`) pode ser reaproveitada por um pequeno script de geração de HTML estático (ou automatizada via GitHub Actions a cada `git push`), sem que nada mude na forma como as páginas são escritas. Essa era a alternativa descartada nesta versão em favor da simplicidade — fica registrada aqui para referência futura.

## Fontes

Latin Modern (Roman, Sans e Mono), da GUST e-foundry, com base no Computer Modern de Donald Knuth. Licença livre (GUST Font License) — ver `assets/fonts/LICENSE/GUST-FONT-LICENSE.md`.
