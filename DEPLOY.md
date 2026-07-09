# heparamotor.ru — Deploy Instructions

## Architecture

- `index.html` — HTML structure + inline CSS + JSON-LD schemas
- `src/main.js` — All JavaScript logic (single source of truth)
- GitHub Pages serves from repo root

## Quick Update

```bash
cd /Users/up/business/paramotor
# Edit src/main.js or index.html
bash deploy.sh "describe change"
```

## Commands

```bash
# Full deploy
bash deploy.sh "Update: [describe change]"

# Or manual
git add -A
git commit -m "Update: [describe change]"
git push origin main
```

## Live

https://heparamotor.ru

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | HTML + CSS + JSON-LD structured data |
| `src/main.js` | JavaScript — engines, parts, configurator, AI, dealers |
| `favicon.svg` | Site favicon (repo root) |
| `og-image.svg` | Open Graph / social preview 1200×630 |
| `site.webmanifest` | Web app manifest |
| `public/favicon.svg` | Favicon copy for public/ |
| `public/icons.svg` | Icon sprite |
| `robots.txt` | Crawler directives |
| `sitemap.xml` | Sitemap for search engines |
| `CNAME` | Custom domain |
| `llms.txt` | LLM crawler metadata |
