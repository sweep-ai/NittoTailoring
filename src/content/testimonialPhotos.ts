import type { Audience } from '@/config/audience'

export type TestimonialPhoto = {
  id: string
  src: string
  alt: string
}

/** Display size for banner slides. */
export const testimonialSlideSize = {
  width: 220,
  height: 220,
} as const

const malePhotoModules = import.meta.glob<string>('@assets/images/testimonials/male/*.{png,webp}', {
  eager: true,
  import: 'default',
})

const femalePhotoModules = import.meta.glob<string>('@assets/images/testimonials/female/*.png', {
  eager: true,
  import: 'default',
})

function buildTestimonialPhotos(
  modules: Record<string, string>,
  idPrefix: string,
): TestimonialPhoto[] {
  return Object.entries(modules)
    .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
    .map(([, src], index) => ({
      id: `${idPrefix}-${index + 1}`,
      src,
      alt: `Before and after transformation ${index + 1}`,
    }))
}

const maleTestimonialPhotos = buildTestimonialPhotos(malePhotoModules, 'male-photo')
const femaleTestimonialPhotos = buildTestimonialPhotos(femalePhotoModules, 'female-photo')

export function getTestimonialPhotos(audience: Audience): TestimonialPhoto[] {
  return audience === 'women' ? femaleTestimonialPhotos : maleTestimonialPhotos
}
