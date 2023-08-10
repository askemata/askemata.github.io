---
tags: recursos
image: img/postbanners/2022-06-02-whats-new-in-sql-server-2022.png
---

# Criando facilmente um blog em html estático no Github

<div class="div-toc" markdown="block">
    * TOC
    {:toc}
  </div>

## Introdução

É na página de [Chad Baldwin](https://chadbaldwin.net/2021/03/14/how-to-build-a-sql-blog.html) que se pode encontrar uma dica fácil, na qual em poucos minutos é possível criar um blog em html estático usando o *Github Pages*. 

Após seguir os passos ali contidos, vale olhar também a [fonte de seu próprio blog](https://github.com/chadbaldwin/chadbaldwin.github.io/tree/main), para implementações. Ou, para quem quiser entender como funciona o Jekyll, programa que constrói o site, [esse texto]( https://tableless.com.br/jekyll-servindo-sites-estaticos/) é bem esclarecedor.

## Olhando um pouco mais

### Cabeçalho YML

Basicamente, pode-se ver que os cabeçalhos das publicações podem se desenrolar como se segue, a partir da estrutura em YML front-matter:


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

### Tags e categorias

Há também a possibilidade de confecção de tags para separar os posts por assunto no Arquivo. [Esse texto](https://blog.nandomoreira.dev/usando-categorias-e-tags-no-jekyll), em português, explica um pouco mais a implementação de tags e categorias.

As mesmas tags também podem ser utilizadas para a criação de [páginas específicas e nuvens](https://longqian.me/2017/02/09/github-jekyll-tag/).

### Busca

É também possível inserir um mecanismo de busca. [Esse site](https://jekyllcodex.org/without-plugin/search-lunr/) tem regras simples para o mecanismo Lunr.js. 

### Seções expansíveis

Pode-se criar uma seção recolhida assim:

```
<details> 
<summary>conteudo de sumário</summary>
Conteúdo a ser expandido  
</details>
```

Cujo resultado é:

<details> 
<summary>conteudo de sumário</summary>
Conteúdo a ser expandido  
 
</details>
 <br><br>

### Callouts

Há também códigos para `admonitions` ou `callouts`, como se pode ver [aqui](https://www.w3schools.com/howto/howto_css_notes.asp):

```
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
div {
  margin-bottom: 15px;
  padding: 4px 12px;
}

.danger {
  background-color: #ffdddd;
  border-left: 6px solid #f44336;
}

.success {
  background-color: #ddffdd;
  border-left: 6px solid #04AA6D;
}

.info {
  background-color: #e7f3fe;
  border-left: 6px solid #2196F3;
}


.warning {
  background-color: #ffffcc;
  border-left: 6px solid #ffeb3b;
}
</style>
</head>
<body>

<h2>Notes</h2>
<div class="danger">
  <p><strong>Danger!</strong> Some text...</p>
</div>

<div class="success">
  <p><strong>Success!</strong> Some text...</p>
</div>

<div class="info">
  <p><strong>Info!</strong> Some text...</p>
</div>

<div class="warning">
  <p><strong>Warning!</strong> Some text...</p>
</div>

</body>
</html>

```

Cujo resultado é

<div class="danger">
  <p><strong>Jamais esquecer!</strong> "A arte da vida consiste em fazer da vida uma obra de arte" (Gandhi) </p>
</div>

### Css simples

É possível fazer html css simples também: 

```
<div style="width: 90%; height: 100%; margin: 15px 15px 15px 15px; padding: 15px; background-color: #E0FFFF;">
    "A arte da vida consiste em fazer da vida uma obra de arte"<br>
    Gandhi
</div>
```

Cujo resultado é: 

<div style="width: 90%; height: 100%; margin: 15px 15px 15px 15px; padding: 15px; background-color: #E0FFFF;">
    "A arte da vida consiste em fazer da vida uma obra de arte"<br>
    Gandhi
</div>

### Divs para conteudos destacados

Resultados com divs com conteudos separados. Ex.:

```
<div class="div-destaque">
    <b>Lembrete:</b>
    "Quem mata o tempo fere a eternidade" (Thoreau)
  </div>
```
Cujo resultado é:

<div class="div-destaque">
    <b>Lembrete:</b>
    "Quem mata o tempo fere a eternidade" (Thoreau)
  </div>
 
### Tabela de conteudos

Há tabelas de conteúdos já inseridas nas possibilidades do Jekyll, como se vê [aqui](http://www.seanbuscay.com/blog/jekyll-toc-markdown/)

```
* TOC
{:toc}
```

## Outras possibilidades

Há outros empreendimentos incríveis em Jekyll. Por ex., o [Just the Docs](https://just-the-docs.com).

Este post é um *work in progress*[^1]


[^1]: Testando nota de rodapé.
