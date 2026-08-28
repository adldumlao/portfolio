# Portfolio

Astro + Tailwind personal site: About, Home Lab, Projects.

## Run locally

npm install
npm run dev        # localhost:4321
npm run build       # outputs to dist/

## Add a new project

Create a new markdown file in `src/content/projects/`, e.g.:

    src/content/projects/my-new-thing.md

Frontmatter fields: title, description, status (active | wip | archived),
stack (array of strings), repoUrl, demoUrl (optional), date, order
(controls sort position). Write the write-up in markdown below the
frontmatter. It appears on /projects automatically — no code changes
needed.

## Before deploying

- Replace `yourdomain.com` in astro.config.mjs and Nav/Footer email/social links
- Swap the About page photo placeholder and bio copy
- Update the hardware table on the Home Lab page to match your actual rack
- Update site title in Layout.astro

## Deploy

Push to GitHub, then connect the repo in Cloudflare Pages (or Netlify/Vercel).
Build command: `npm run build`  ·  Output directory: `dist`
