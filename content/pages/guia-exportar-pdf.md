---
title: "Guia do editor: exportar um artigo em PDF"
author: "Equipe Askemata"
date: "2026-07-01"
abstract: "As quatro formas de gerar um PDF a partir de um artigo, da mais simples à de maior fidelidade tipográfica."
keywords: [guia, exportação, pdf, impressão, latex, pagedjs]
language: "pt-BR"
---

Todo artigo exibe, logo abaixo do menu superior, quatro opções — da mais rápida à de maior fidelidade tipográfica.

## 1. Exportar A5 / Exportar A4 (2 colunas)

Usa só o recurso de impressão do próprio navegador. Ao clicar, o navegador abre a caixa de diálogo de impressão já ajustada para o formato escolhido — basta trocar o destino para **Salvar como PDF**. É o caminho mais simples, mas a fidelidade varia entre navegadores: funciona bem no Chrome e no Edge, e de forma mais inconsistente no Firefox e principalmente no Safari.

## 2. Pré-visualizar (alta fidelidade)

Abre uma pré-visualização paginada por uma biblioteca chamada Paged.js, que calcula a paginação em JavaScript em vez de depender só da implementação de cada navegador. O resultado é bem mais consistente entre Chrome, Firefox e Safari. Ainda roda inteiramente no navegador, sem nenhuma instalação.

## 3. PDF LaTeX (A5 / A4)

Links diretos para arquivos já prontos, gerados automaticamente por um robô do GitHub (GitHub Actions) que roda Pandoc e uma distribuição real de LaTeX a cada atualização do site. É a mesma qualidade tipográfica de um documento composto diretamente em LaTeX — hifenização, quebras de página e espaçamento calculados pelo motor do LaTeX. Esses arquivos só existem depois que esse processo roda pelo menos uma vez no repositório publicado.

## Qual escolher?

- Para uma conferência rápida: **Exportar A5/A4**.
- Para um resultado visualmente consistente entre diferentes navegadores, sem sair do site: **Pré-visualizar (alta fidelidade)**.
- Para o padrão tipográfico mais alto possível, para publicação ou arquivo: **PDF LaTeX**.
