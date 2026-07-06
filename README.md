# UWA AI Club — Website

The official site of the [UWA AI Club](https://linkedin.com/company/uwa-ai-club) — built by students, for students (and the occasional agent).

## Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** — design tokens in `app/globals.css`
- **motion** — scroll-driven storytelling + orchestration
- Hand-rolled canvas neural field (`components/NeuralCanvas.tsx`) — no library, that's the flex

## The experience

- `BootIntro` — terminal boot sequence (once per session, skippable, respects reduced motion)
- `MarvCompanion` — Marv reacts to your cursor and what you're reading (12 expression sprites in `public/marv/expressions/`)
- `Vision` — the club's official vision statement, revealed word-by-word on scroll
- `Values` — what we optimise for

## Develop

```bash
npm install
npm run dev
```

## Deploy

Deployed on Vercel — pushes to `main` go live automatically.
