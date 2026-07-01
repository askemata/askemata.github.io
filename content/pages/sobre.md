---
title: "Sobre o projeto"
author: "Equipe Askemata"
date: "2026-07-01"
abstract: "Descrição técnica e editorial do Askemata: um site estático que renderiza Markdown diretamente no navegador."
keywords: [sobre, arquitetura, markdown]
language: "pt-BR"
---

Askemata é abastecido inteiramente por arquivos Markdown guardados em `content/pages/`. Não há banco de dados nem painel de administração: escrever um novo artigo é criar um novo arquivo `.md`.

## Arquitetura

- **content/menu.md** — define o menu superior, o sumário lateral (com subitens) e o rodapé.
- **content/pages/*.md** — cada arquivo é uma página, com metadados no cabeçalho (YAML) e o texto em Markdown.
- **assets/js/app.js** — lê esses arquivos no navegador e monta a página, sem etapa de build.

## Uma observação sobre indexação acadêmica

Como o conteúdo é montado por JavaScript, mecanismos de busca que não executam JavaScript de forma confiável — caso do robô do Google Scholar — podem não indexar o texto completo das páginas. Os metadados (`citation_title`, `citation_author` etc.) são inseridos dinamicamente e ajudam buscadores comuns, mas não substituem a indexação que uma versão pré-renderizada teria. Essa é uma escolha deliberada em favor da simplicidade de edição — sem etapa de build. Veja o `README.md` do projeto para mais detalhes e para o caminho de migração, caso a indexação no Scholar se torne prioritária no futuro.
