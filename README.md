# yerragondu.com

Personal portfolio site for **Nikhil Reddy Yerragondu** — AI Engineer.

Content is a faithful replication of the LinkedIn profile at
[linkedin.com/in/yerragondu](https://www.linkedin.com/in/yerragondu/):
About, all 6 roles, 10 projects, both degrees with coursework, 10 certifications,
the IEEE publication, and contact links.

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies, no framework.
Drop the folder on any static host and it works.

```
index.html        all content + JSON-LD Person schema + OG/Twitter meta
styles.css        design tokens, light/dark themes, responsive + print styles
main.js           theme toggle, mobile menu, scroll reveal, scroll progress,
                  active-nav highlighting, project filter
assets/
  profile.jpg     800x800 headshot
  favicon.svg     theme-aware monogram
CNAME             custom domain for GitHub Pages
robots.txt        + sitemap reference
sitemap.xml       single-page sitemap
.nojekyll         stops GitHub Pages running Jekyll
.claude/          local preview server (dev only — safe to delete before deploy)
```

## Features

- **Light / dark themes** — follows the OS by default, with a manual toggle
  persisted in `localStorage`
- **Responsive** down to 375px, with a slide-down mobile nav
- **Project filtering** by area (AI/ML, Vision, Multimodal, Cloud, Product)
- **Accessible** — skip link, semantic landmarks, visible focus rings,
  `prefers-reduced-motion` respected, ARIA on interactive controls
- **SEO** — JSON-LD `Person` schema, canonical URL, Open Graph + Twitter cards,
  sitemap and robots
- **Print stylesheet** — `Ctrl/Cmd+P` produces a clean resume-style document

## Local preview

```bash
node .claude/serve.js
```

Then open <http://localhost:4321>.

## Deploy

Everything is static, so any of these work. The domain is already wired into
`CNAME`, `sitemap.xml`, and the `og:`/`canonical` meta tags.

### Cloudflare Pages (recommended — free, fast, free SSL)

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, pick the repo.
3. Build command: *(leave empty)*. Build output directory: `/`.
4. **Custom domains** → add `yerragondu.com` and `www.yerragondu.com`.

### Netlify

Drag the folder onto <https://app.netlify.com/drop>, then
**Domain settings** → **Add custom domain** → `yerragondu.com`.

### Vercel

```bash
npx vercel --prod
```

Then **Settings** → **Domains** → add `yerragondu.com`.

### GitHub Pages

1. Push to a repo named `yerragondu.github.io` (or any repo with Pages enabled
   on the `main` branch, root folder).
2. **Settings** → **Pages** → Custom domain → `yerragondu.com`, tick
   **Enforce HTTPS**.
3. `CNAME` and `.nojekyll` are already in place.

### DNS (at your registrar)

| Type  | Name  | Value                        |
|-------|-------|------------------------------|
| A / ALIAS | `@` | your host's apex target     |
| CNAME | `www` | your host's subdomain target |

Each host shows the exact values after you add the custom domain.

## Updating content

All copy lives in `index.html` as plain markup — edit it directly.

- **New role** — copy an `<li class="tl-item reveal">` block in `#experience`,
  newest first.
- **New project** — copy an `<article class="proj reveal">` block in `#work`.
  The `data-tags` attribute drives the filter chips
  (`ai`, `vision`, `multimodal`, `cloud`, `product`); add
  `proj-feat` to make a card span two columns.
- **Colours and type** — the `:root` custom properties at the top of
  `styles.css`; dark values are redefined in the two blocks directly below.

## Not yet included

- **Resume PDF.** Your LinkedIn Featured section links one, but it is hosted
  behind LinkedIn's auth and could not be downloaded. Drop the file at
  `assets/resume.pdf` and add a link next to the hero buttons:
  ```html
  <a class="btn btn-ghost" href="assets/resume.pdf" target="_blank" rel="noopener">Resume</a>
  ```
- **Project repo links.** Only the IEEE paper had a public URL on the profile.
  Add per-project links with a `<p class="proj-links">` block inside any card.
- **A custom OG preview image.** Social cards currently use the square headshot;
  a 1200×630 image at `assets/og.jpg` would render better. Update the
  `og:image` and `twitter:image` tags if you add one.
