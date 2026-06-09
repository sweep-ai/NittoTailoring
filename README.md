# Alpha Reset System — Booking Funnel

A high-performance React funnel mirroring the [Alpha Reset System](https://booking.alpharesetsystem.com/applynow) apply and thank-you flows.

## Routes

| Path | Description |
|------|-------------|
| `/` | Quiz funnel (root) |
| `/training` | Personalized VSL after quiz (requires quiz session) |
| `/applynow` | VSL landing page with Apply Now → Typeform modal |
| `/thank-you` | Thank-you page with main VSL, FAQ videos, results section |
| `/privacy-policy` | Privacy policy (data collection & marketing) |
| `/terms` | Terms of service |
| `/disclaimer` | Health, results, and general disclaimer |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173/applynow](http://localhost:5173/applynow).

### Production build

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` to override defaults:

```env
VITE_TYPEFORM_LIVE_ID=01KTNBNYDMJSH7PKS373QG2AJF
VITE_SITE_NAME=Alpha Reset System
VITE_CONTACT_EMAIL=hello@example.com
VITE_SITE_URL=https://your-production-domain.com
```

## Vercel deployment

- `vercel.json` rewrites all routes to `index.html` so React Router paths work on refresh and direct links.
- `public/robots.txt` points crawlers at `/sitemap.xml`.
- `npm run build` generates `sitemap.xml` into `dist/` using `VITE_SITE_URL`, or Vercel’s production URL when that env var is unset.

Set `VITE_SITE_URL` in the Vercel project to your canonical domain for correct sitemap URLs.

Legal page copy lives in `src/content/legal/documents.ts`. Have a qualified attorney review before going live.

## Project structure

```
src/
├── app/           # Router shell and providers
├── pages/         # Route-level page components
├── components/    # Reusable UI, layout, media, funnel
├── content/       # Copy and Vimeo IDs (single source of truth)
├── config/        # Env helpers
└── styles/        # Global CSS, tokens, reset

assets/
├── images/        # Brand images (testimonials, heroes)
├── logos/         # Logo files
└── fonts/         # Custom web fonts
```

Import assets in components via the `@assets` alias:

```tsx
import logo from '@assets/logos/logo.png'
```

## Updating content

- **Apply page copy & main VSL:** `src/content/apply.ts`
- **Thank-you page copy & main VSL:** `src/content/thankYou.ts`
- **FAQ videos:** `src/content/faqVideos.ts`

## Performance notes

- Vimeo iframes load only after user clicks play (click-to-play facade)
- FAQ videos mount iframes only when accordion item is expanded
- Typeform embed is lazy-loaded when the Apply Now modal opens
- Route-level code splitting for apply and thank-you pages
- Brotli/gzip compression on production builds

## Tech stack

- Vite + React 19 + TypeScript
- React Router 7
- CSS Modules + CSS custom properties
- Typeform live embed (`embed.typeform.com/next/embed.js`)
