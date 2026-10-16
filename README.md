# SOLA

Editorial website for **SOLA**, an architecture and interior-design studio. The site is built as a production-ready Next.js application: Turkish copy, project and service archives, a validated inquiry form, and a cinematic homepage.

## Features

- Homepage with manifesto, selected work, services, process timeline, testimonials, journal, and closing call to action
- Project archive with category filters, galleries, materials, and related work
- Service pages with scope, process, FAQs, and related projects
- Studio, journal, and contact routes, including a confirmation page after a successful inquiry
- Client and server validation (Zod), optional PDF/JPG/PNG/WEBP upload, honeypot, and rate limiting
- SEO metadata, sitemap, robots, Open Graph, and JSON-LD
- Motion (desktop), GSAP ScrollTrigger, Lenis smooth scrolling, Swiper, and GLightbox — disabled or reduced when `prefers-reduced-motion` is set

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| UI | React 19, Tailwind CSS v4 |
| Motion | Motion, GSAP + ScrollTrigger, Lenis |
| Forms | React Hook Form, Zod |
| Media | `next/image`, Swiper, GLightbox |

## Getting started

**Requirements:** Node.js 20 or later, npm.

```bash
git clone <repository-url>
cd mimarlik
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Configuration

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Studio name, email, city, and navigation live in `src/lib/site.ts`. Project, service, and article content live in `src/data/`.

## Inquiry form

Contact submissions are validated on the client and again in a server action. A successful save redirects to `/iletisim/sonuc/[id]`. Failed writes do not fake success; the form keeps the user’s input.

Records are stored on disk under `data/submissions/` through a small repository interface (`src/lib/submissions/`). That folder is gitignored. Swap the file adapter for another backend without changing the form.

Uploads: PDF, JPEG, PNG, or WebP, maximum 8 MB, checked by MIME type, extension, and file signature.

## Project structure

```text
src/
  app/                 # Routes, metadata, server actions
  components/          # Layout, sections, forms, UI
  data/                # Projects, services, journal posts
  lib/                 # SEO, validation, submissions, content helpers
  types/               # Shared TypeScript types
public/images/u/       # Studio imagery
```

Public routes:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/projeler` | Projects (`?kategori=` filters) |
| `/projeler/[slug]` | Project detail |
| `/hizmetler` | Services |
| `/hizmetler/[slug]` | Service detail |
| `/hakkimizda` | About |
| `/blog`, `/blog/[slug]` | Journal |
| `/iletisim` | Contact |
| `/iletisim/sonuc/[id]` | Inquiry receipt |

## Notes

- Copy and imagery are editorial. Replace `studio@example.com` and `NEXT_PUBLIC_SITE_URL` before going live.
- Inquiry receipts are not indexed (`robots: noindex`).
- Smooth scrolling runs on viewports `1024px` and up, and is skipped when the user prefers reduced motion.

## License

Private. All rights reserved unless a license is added to this repository.
