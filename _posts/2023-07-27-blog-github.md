# Criando facilmente um blog em html estático no Github

É na página de [Chad Baldwin](https://chadbaldwin.net/2021/03/14/how-to-build-a-sql-blog.html) que se pode encontrar uma dica fácil, na qual em poucos minutos é possível criar um blog em html estático usando o Github Pages. 

Após seguir os passos ali contidos, vale olhar também a [fonte de seu próprio blog](https://github.com/chadbaldwin/chadbaldwin.github.io/tree/main), para implementações.

Basicamente, pode-se ver que os cabeçalhos das publicações podem se desenrolar como se segue: 

```
---
layout: post
title: "What's new in SQL Server 2022"
description: "Taking a look at some of the new language enhancements coming in SQL Server 2022"
date: 2022-06-02T12:30:00-07:00
tags: T-SQL
image: img/postbanners/2022-06-02-whats-new-in-sql-server-2022.png
---
```
, de onde se vê, dentre outras funcionalidades, também a possibilidade de confecção de tags para separar os posts por assunto no Arquivo. 

Este post é um *work in progress*
