import styles from './ClientLogoBanner.module.css'

const brandLogoModules = import.meta.glob<string>('@assets/images/brands/*.png', {
  eager: true,
  import: 'default',
})

function brandLogo(fileName: string) {
  const match = Object.entries(brandLogoModules).find(([path]) => path.endsWith(`/${fileName}`))
  return match?.[1] ?? ''
}

type ClientBrand = {
  name: string
  alt: string
  src?: string
}

const CLIENT_BRANDS: ClientBrand[] = [
  { name: 'Morgan Stanley', alt: 'Morgan Stanley', src: brandLogo('morgan-stanley.png') },
  { name: 'JP Morgan', alt: 'JP Morgan', src: brandLogo('jpmorgan.png') },
  { name: 'Goldman Sachs', alt: 'Goldman Sachs', src: brandLogo('goldman-sachs.png') },
  { name: 'Jefferies', alt: 'Jefferies' },
  { name: 'Citigroup', alt: 'Citigroup', src: brandLogo('citi.png') },
  { name: 'Apple', alt: 'Apple', src: brandLogo('apple.png') },
  { name: 'Google', alt: 'Google', src: brandLogo('google.png') },
  { name: 'McKinsey', alt: 'McKinsey & Company', src: brandLogo('mckinsey.png') },
  { name: 'Deloitte', alt: 'Deloitte', src: brandLogo('deloitte.png') },
  { name: 'Ernst & Young', alt: 'Ernst & Young', src: brandLogo('ey.png') },
  { name: 'Kirkland & Ellis', alt: 'Kirkland & Ellis' },
  { name: 'White & Case', alt: 'White & Case', src: brandLogo('white-and-case.png') },
]

type ClientLogoBannerProps = {
  title?: string
  subtitle?: string
}

export function ClientLogoBanner({
  title = 'Executive Athlete Method',
  subtitle = 'TRAINED EMPLOYEES FROM',
}: ClientLogoBannerProps) {
  return (
    <header className={styles.banner} aria-label="Executive Athlete Method">
      <div className={styles.container}>
        <p className={styles.title}>
          {title}
          <span className={styles.trademark}>™</span>
        </p>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.logoRow} role="list">
          {CLIENT_BRANDS.map((brand) => (
            <div key={brand.name} className={styles.logoItem} role="listitem">
              {brand.src ? (
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className={styles.logo}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <span className={styles.wordmark}>{brand.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
