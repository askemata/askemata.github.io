/* =====================================================================
   ASKEMATA — app.js
   Lê content/menu.md (estrutura de navegação) e content/pages/*.md
   (páginas do site) e monta tudo no navegador. Sem etapa de build.

   Roteamento: ?p=slug  (ex.: index.html?p=introducao)
   Front matter YAML simplificado é interpretado por um parser próprio
   (parseFrontMatter), sem depender de biblioteca externa.
   ===================================================================== */

(function () {
  'use strict';

  const CONTENT_DIR = 'content/pages/';
  const MENU_FILE = 'content/menu.md';
  const DEFAULT_PAGE = 'inicio';
  const SITE_URL = location.origin + location.pathname.replace(/index\.html$/, '');

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function getSlug() {
    const params = new URLSearchParams(location.search);
    return params.get('p') || DEFAULT_PAGE;
  }

  /* -------------------------------------------------------------------
     Front matter — parser mínimo, propositalmente sem dependências.
     Suporta: chave: valor | chave: "valor" | chave: [a, b, c]
     ------------------------------------------------------------------- */
  function parseFrontMatter(raw) {
    const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (!match) return { data: {}, body: raw };
    const [, yamlBlock, body] = match;
    const data = {};
    yamlBlock.split('\n').forEach((line) => {
      const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (!m) return;
      const key = m[1].trim();
      let value = m[2].trim();
      if (/^\[.*\]$/.test(value)) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      } else {
        value = value.replace(/^["']|["']$/g, '');
      }
      data[key] = value;
    });
    return { data, body };
  }

  /* -------------------------------------------------------------------
     Menu — content/menu.md organizado em seções por "## Nome da Seção"
     Seção "Menu Superior"  -> topo
     Seção "Menu Lateral"   -> sumário lateral (aceita sub-itens indentados)
     Seção "Rodapé"         -> rodapé (links e/ou texto solto)
     ------------------------------------------------------------------- */
  function parseMenu(raw) {
    const sections = {};
    let current = null;
    raw.split('\n').forEach((line) => {
      const heading = line.match(/^##\s+(.+)$/);
      if (heading) {
        current = heading[1].trim();
        sections[current] = [];
        return;
      }
      if (current && line.trim() !== '') sections[current].push(line);
    });
    return {
      top: parseList(sections['Menu Superior'] || []),
      side: parseList(sections['Menu Lateral'] || []),
      footer: parseList(sections['Rodapé'] || []),
    };
  }

  // Converte linhas de lista markdown (com indentação = sub-itens) em árvore.
  function parseList(lines) {
    const root = [];
    const stack = [{ indent: -1, children: root }];
    lines.forEach((line) => {
      const m = line.match(/^(\s*)-\s+(.*)$/);
      if (!m) return;
      const indent = m[1].replace(/\t/g, '    ').length;
      const text = m[2].trim();
      const linkMatch = text.match(/^\[(.+?)\]\(([^)]+)\)$/);
      const node = linkMatch
        ? { label: linkMatch[1], href: linkMatch[2], children: [] }
        : { label: text, href: null, children: [] };

      while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
      stack[stack.length - 1].children.push(node);
      stack.push({ indent, children: node.children });
    });
    return root;
  }

  function resolveHref(href) {
    if (/^https?:\/\//.test(href) || href.startsWith('#')) return href;
    return `?p=${href}`;
  }

  function renderLinkList(nodes, currentSlug, isTop) {
    if (!nodes.length) return '';
    const items = nodes
      .map((node) => {
        if (!node.href) {
          // texto solto (ex.: linha de copyright no rodapé)
          return `<li class="plain-text">${node.label}</li>`;
        }
        const isCurrent = node.href === currentSlug;
        const sub = node.children.length ? renderLinkList(node.children, currentSlug, false) : '';
        return `<li><a href="${resolveHref(node.href)}"${isCurrent ? ' aria-current="page"' : ''}>${node.label}</a>${sub}</li>`;
      })
      .join('');
    return `<ul>${items}</ul>`;
  }

  /* -------------------------------------------------------------------
     Metadados para robôs acadêmicos (Google Scholar / Highwire tags)
     Aplicados via JS: ajudam crawlers que executam JavaScript, mas não
     substituem indexação estática — ver README.md para essa ressalva.
     ------------------------------------------------------------------- */
  function applyScholarMeta(data, slug) {
    document.title = data.title ? `${data.title} — Askemata` : 'Askemata';

    const existing = $$('meta[data-scholar]');
    existing.forEach((el) => el.remove());
    const existingLd = $('script[data-scholar-ld]');
    if (existingLd) existingLd.remove();

    const tags = [];
    if (data.title) tags.push(['citation_title', data.title]);
    const authors = Array.isArray(data.author) ? data.author : data.author ? [data.author] : [];
    authors.forEach((a) => tags.push(['citation_author', a]));
    if (data.date) tags.push(['citation_publication_date', data.date]);
    if (data.abstract) tags.push(['citation_abstract', data.abstract]);
    if (data.doi) tags.push(['citation_doi', data.doi]);
    if (data.language) tags.push(['citation_language', data.language]);
    tags.push(['citation_online_date', data.date || '']);
    tags.push(['description', data.abstract || '']);

    tags.forEach(([name, content]) => {
      if (!content) return;
      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      meta.setAttribute('content', content);
      meta.setAttribute('data-scholar', '1');
      document.head.appendChild(meta);
    });

    if (data.keywords) {
      const kw = Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords;
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'keywords');
      meta.setAttribute('content', kw);
      meta.setAttribute('data-scholar', '1');
      document.head.appendChild(meta);
    }

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `${SITE_URL}?p=${slug}`);
    canonical.setAttribute('data-scholar', '1');
    document.head.appendChild(canonical);

    // JSON-LD schema.org — reforço para outros indexadores acadêmicos
    if (data.title) {
      const ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.setAttribute('data-scholar-ld', '1');
      ld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        headline: data.title,
        author: authors.map((name) => ({ '@type': 'Person', name })),
        datePublished: data.date || undefined,
        abstract: data.abstract || undefined,
        keywords: data.keywords ? (Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords) : undefined,
        inLanguage: data.language || 'pt-BR',
        url: `${SITE_URL}?p=${slug}`,
      });
      document.head.appendChild(ld);
    }
  }

  /* -------------------------------------------------------------------
     Renderização do artigo
     ------------------------------------------------------------------- */
  function renderArticleHeader(data) {
    const authors = Array.isArray(data.author) ? data.author.join(', ') : data.author;
    const parts = [];
    if (data.title) parts.push(`<h1 class="article__title">${data.title}</h1>`);
    if (authors || data.date) {
      parts.push(
        `<p class="article__meta">${authors ? `<span class="author">${authors}</span>` : ''}${
          authors && data.date ? ' &middot; ' : ''
        }${data.date ? `<time datetime="${data.date}">${data.date}</time>` : ''}</p>`
      );
    }
    if (data.abstract) {
      parts.push(
        `<div class="article__abstract"><strong>Resumo</strong>${data.abstract}</div>`
      );
    }
    if (data.keywords) {
      const kw = Array.isArray(data.keywords) ? data.keywords.join(' · ') : data.keywords;
      parts.push(`<p class="article__keywords"><strong>Palavras-chave:</strong> ${kw}</p>`);
    }
    return parts.length ? `<header class="article__header">${parts.join('')}</header>` : '';
  }

  function renderToolbar() {
    return `
      <div class="article__toolbar">
        <button type="button" data-export="a5">Exportar A5</button>
        <button type="button" data-export="a4-2col">Exportar A4 (2 colunas)</button>
      </div>`;
  }

  async function loadPage(slug) {
    const main = $('#main-content');
    main.innerHTML = '<p class="state-message">Carregando…</p>';
    try {
      const res = await fetch(`${CONTENT_DIR}${slug}.md`, { cache: 'no-cache' });
      if (!res.ok) throw new Error('not-found');
      const raw = await res.text();
      const { data, body } = parseFrontMatter(raw);
      const html = window.marked.parse(body);

      main.innerHTML = `
        <article class="article">
          ${renderToolbar()}
          ${renderArticleHeader(data)}
          <div class="article__body">${html}</div>
        </article>`;

      applyScholarMeta(data, slug);
      highlightActiveLinks(slug);
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    } catch (err) {
      main.innerHTML = `
        <div class="state-message">
          <p>Não foi possível encontrar esta página (<code>${slug}</code>).</p>
          <p><a href="?p=${DEFAULT_PAGE}">Voltar ao início</a></p>
        </div>`;
      document.title = 'Página não encontrada — Askemata';
    }
  }

  function highlightActiveLinks(slug) {
    $$('.topnav a, .sidebar a').forEach((a) => {
      const url = new URL(a.getAttribute('href'), location.href);
      const p = new URLSearchParams(url.search).get('p');
      if (p === slug) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* -------------------------------------------------------------------
     Exportação / impressão
     ------------------------------------------------------------------- */
  function setPageSize(size) {
    let style = $('#page-size-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'page-size-style';
      document.head.appendChild(style);
    }
    style.textContent = `@media print { @page { size: ${size}; } }`;
  }

  function bindExportButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-export]');
      if (!btn) return;
      const mode = btn.getAttribute('data-export');
      document.body.classList.remove('print-a5', 'print-a4-2col');
      if (mode === 'a5') {
        setPageSize('A5');
        document.body.classList.add('print-a5');
      } else {
        setPageSize('A4');
        document.body.classList.add('print-a4-2col');
      }
      window.print();
    });
  }

  /* -------------------------------------------------------------------
     Montagem inicial
     ------------------------------------------------------------------- */
  async function init() {
    const res = await fetch(MENU_FILE, { cache: 'no-cache' });
    const raw = await res.text();
    const menu = parseMenu(raw);

    $('#topnav-list').innerHTML = renderLinkList(menu.top, null, true).replace(/^<ul>|<\/ul>$/g, '');

    $('#sidebar-nav').innerHTML = renderLinkList(menu.side, null, false) || '<p class="state-message">Sem itens.</p>';

    $('#footer-links').innerHTML = renderLinkList(menu.footer, null, false)
      .replace(/^<ul>/, '<ul class="site-footer__links">');

    bindExportButtons();
    await loadPage(getSlug());
  }

  window.addEventListener('popstate', () => loadPage(getSlug()));

  // Intercepta cliques em links internos (?p=slug) para navegação sem reload
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="?p="]');
    if (!a) return;
    e.preventDefault();
    const url = new URL(a.href, location.href);
    history.pushState(null, '', url.search);
    loadPage(getSlug());
  });

  document.addEventListener('DOMContentLoaded', init);
})();
