# adldumlao.com

This is my personal portfolio — built while I transition into cybersecurity
and work toward a SOC analyst role. It's less a "finished product" and more
a living record: certifications as I earn them, home lab progress as I build
it, and projects as I actually ship them.

Live at [adldumlao.com](https://adldumlao.com).

## Stack

Astro + Tailwind CSS (plain PostCSS setup, no `@astrojs/tailwind` — that
integration breaks on recent Astro versions). Hosted on Cloudflare Workers,
DNS and email routing on Cloudflare, domain from Porkbun.

## Running it locally

```
npm install
npm run dev      # localhost:4321
npm run build    # outputs to dist/
```

## Adding a new project

Drop a markdown file into `src/content/projects/`, e.g.:

```
src/content/projects/my-new-thing.md
```

Frontmatter fields: `title`, `description`, `status` (`active` | `wip` |
`archived`), `stack` (array of strings), `repoUrl`, `demoUrl` (both
optional), `date`, `order` (controls sort position). Whatever you write in
markdown below the frontmatter becomes the project's detail page. It shows
up on the homepage automatically — no code changes needed.

## Adding a Home Lab build log entry

Same idea, different folder — drop a markdown file into `src/content/homelab/`:

```
src/content/homelab/04-siem-integration.md
```

Frontmatter fields: `title`, `summary` (shown collapsed), `status`
(`complete` | `in-progress` | `planned`), `order`. Markdown below the
frontmatter is the expanded detail shown when someone clicks the entry
open. Appears on `/homelab` automatically, sorted by `order`.

## Deploying

Push to `main` on GitHub — Cloudflare is already connected and rebuilds
automatically. Build command: `npm run build` · Output: `dist`.

## Notes to future me

- If `npm audit` flags something, try `npm audit fix` (no `--force`) first.
  Only force a major version bump if you can verify `npm run build` still
  works afterward.
- If content collection changes don't show up even after restarting the
  dev server, delete the `.astro/` cache folder and restart. Astro's
  content layer occasionally holds onto deleted entries.
- Cert verify links live directly in `src/pages/index.astro` under the
  `certifications` array.
