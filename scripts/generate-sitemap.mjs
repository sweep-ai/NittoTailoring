import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/applynow', changefreq: 'monthly', priority: '0.9' },
  { path: '/training', changefreq: 'monthly', priority: '0.7' },
  { path: '/thank-you', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
]

function resolveSiteUrl() {
  const fromEnv = process.env.VITE_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (production) return `https://${production.replace(/^https?:\/\//, '')}`

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '')}`

  return 'http://localhost:5173'
}

function buildSitemap(baseUrl) {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = routes
    .map(
      ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${routePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const outDir = process.argv.includes('--out')
  ? path.resolve(process.argv[process.argv.indexOf('--out') + 1])
  : path.resolve(__dirname, '../public')

const baseUrl = resolveSiteUrl()
const xml = buildSitemap(baseUrl)

writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
console.log(`Wrote sitemap.xml (${routes.length} URLs) → ${baseUrl}`)
