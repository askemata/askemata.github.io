---
title: "Tipografia e leitura longa: um exemplo de artigo"
author: [Maria da Silva, João Pereira]
date: "2026-06-15"
abstract: "Este artigo demonstra os elementos tipográficos disponíveis no modelo Askemata — títulos, citações, notas, tabelas e blocos de código — usando a fonte Latin Modern, a mesma família tipográfica dos documentos produzidos em LaTeX."
keywords: [tipografia, latex, latin modern, markdown]
language: "pt-BR"
doi: "10.0000/askemata.exemplo"
---

Este texto existe para mostrar, na prática, os elementos tipográficos que o modelo Askemata oferece a partir de um único arquivo Markdown. A primeira letra do parágrafo recebe destaque automático — recurso comum em publicações acadêmicas e editoriais impressas.

## Estrutura de seções

Os títulos de seção (`##`) recebem um filete inferior discreto, como em artigos de periódico. Subseções (`###`) aparecem em itálico, e um quarto nível (`####`) é composto em versalete.

### Uma subseção

Parágrafos comuns são justificados e hifenizados automaticamente pelo navegador, aproximando a leitura em tela da experiência de um documento tipografado em LaTeX.

Citações longas aparecem como bloco recuado:

> A boa tipografia não chama atenção para si mesma; ela serve ao texto e desaparece na leitura.

## Listas, tabelas e código

- Primeiro item
- Segundo item
  - Subitem

| Elemento | Fonte usada |
|---|---|
| Corpo do texto | Latin Modern Roman |
| Menus e legendas | Latin Modern Sans |
| Código | Latin Modern Mono |

Um trecho de código:

```
def saudacao(nome):
    return f"Olá, {nome}"
```

## Exportação

Use os links **Exportar A5** e **Exportar A4 (2 colunas)** no topo deste artigo para abrir o diálogo de impressão do navegador já configurado no formato escolhido — basta selecionar "Salvar como PDF" no destino da impressão.
