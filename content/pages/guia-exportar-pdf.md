---
title: "Guia do editor: exportar um artigo em PDF"
author: "Equipe Askemata"
date: "2026-07-01"
abstract: "Como usar os botões de exportação para gerar um PDF em A5 ou em A4 com duas colunas."
keywords: [guia, exportação, pdf, impressão]
language: "pt-BR"
---

Todo artigo exibe, logo abaixo do menu superior, dois controles: **Exportar A5** e **Exportar A4 (2 colunas)**.

## O que cada um faz

- **Exportar A5** — remove o menu, a barra lateral e o rodapé, e formata o texto em coluna única, em tamanho reduzido — ideal para um folheto ou leitura impressa compacta.
- **Exportar A4 (2 colunas)** — formata o artigo em duas colunas, como um artigo de periódico, no tamanho A4.

## Salvando como PDF

Ao clicar em qualquer um dos botões, o navegador abre a caixa de diálogo de impressão já ajustada para o formato escolhido. Basta trocar o destino de "impressora" para **Salvar como PDF** (essa opção existe nativamente em Chrome, Edge, Firefox e Safari) e confirmar.

## Por que esse método, e não um gerador de PDF pronto

Esse fluxo usa apenas os recursos de impressão do próprio navegador — não depende de nenhum serviço externo nem de instalação de programas como o LaTeX. Isso mantém o site inteiramente estático, ao custo de um controle tipográfico um pouco menor do que uma composição feita diretamente em LaTeX. Se, no futuro, for necessário um acabamento gráfico ainda mais refinado, o mesmo Markdown pode alimentar uma rota alternativa via Pandoc — mas isso exigiria uma etapa de processamento fora do navegador.
