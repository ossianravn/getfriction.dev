# getfriction.dev

The server-rendered website for Friction, a local-first feedback loop for coding
agents.

## Local development

Install dependencies and start Astro:

```bash
npm ci
npm run dev
```

## Production

Build and run the standalone Node server:

```bash
npm run check
npm run start
```

The production build uses Astro 7 in server output mode with the official Node
adapter. The document and static sections render on the server. React is limited
to the copy-enabled AI Elements snippet and terminal islands.

## Integrations

- `@astrojs/node` for standalone Node SSR
- `@astrojs/react` for focused React islands
- `@astrojs/sitemap` for sitemap generation
- Tailwind CSS 4 through its official Vite plugin
- Checked-in Shadcn UI and AI Elements component source

Canonical metadata, Open Graph and Twitter cards, JSON-LD, `robots.txt`, and
sitemap discovery use `https://getfriction.dev` as the production origin.
