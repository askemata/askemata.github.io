---
title: "Guia do editor: como criar uma página"
author: "Equipe Askemata"
date: "2026-07-01"
abstract: "Passo a passo para adicionar uma nova página ao site e incluí-la nos menus, sem escrever código."
keywords: [guia, edição, markdown]
language: "pt-BR"
---

## 1. Crie o arquivo

Dentro da pasta `content/pages/`, crie um arquivo `.md` com um nome curto e sem espaços — esse nome é o "slug" da página. Exemplo: `content/pages/minha-pagina.md`.

## 2. Preencha o cabeçalho

No topo do arquivo, entre duas linhas `---`, preencha os metadados da página:

```
---
title: "Título da página"
author: "Seu nome"
date: "2026-07-01"
abstract: "Um resumo de uma ou duas frases."
keywords: [palavra1, palavra2]
language: "pt-BR"
---
```

Todos os campos são opcionais, mas quanto mais completos, melhores os metadados gerados para buscadores.

## 3. Escreva o conteúdo

Depois do segundo `---`, escreva o texto normalmente em Markdown: `#` para títulos, `**negrito**`, `*itálico*`, listas com `-`, links com `[texto](url)`, imagens com `![legenda](caminho-da-imagem.jpg)`.

## 4. Adicione a página a um menu

Abra `content/menu.md` e adicione uma linha na seção desejada:

```
- [Texto do link](minha-pagina)
```

Pronto — a página já aparece no site na próxima vez que a página for carregada no navegador.
