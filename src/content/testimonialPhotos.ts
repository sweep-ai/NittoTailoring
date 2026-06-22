import type { Audience } from '@/config/audience'
import male01 from '@assets/images/testimonials/male/testimonial-01.png'
import male02 from '@assets/images/testimonials/male/testimonial-02.png'
import male03 from '@assets/images/testimonials/male/testimonial-03.png'
import male04 from '@assets/images/testimonials/male/testimonial-04.png'
import male05 from '@assets/images/testimonials/male/testimonial-05.png'
import male06 from '@assets/images/testimonials/male/testimonial-06.png'
import male07 from '@assets/images/testimonials/male/testimonial-07.png'
import male08 from '@assets/images/testimonials/male/testimonial-08.png'
import male09 from '@assets/images/testimonials/male/testimonial-09.png'
import male10 from '@assets/images/testimonials/male/testimonial-10.png'
import male11 from '@assets/images/testimonials/male/testimonial-11.png'
import male12 from '@assets/images/testimonials/male/testimonial-12.png'

export type TestimonialPhoto = {
  id: string
  src: string
  alt: string
}

/** Display size for banner slides (source assets are 640×640). */
export const testimonialSlideSize = {
  width: 220,
  height: 220,
} as const

const maleTestimonialPhotos: TestimonialPhoto[] = [
  { id: 'male-photo-01', src: male01, alt: 'Before and after transformation 1' },
  { id: 'male-photo-02', src: male02, alt: 'Before and after transformation 2' },
  { id: 'male-photo-03', src: male03, alt: 'Before and after transformation 3' },
  { id: 'male-photo-04', src: male04, alt: 'Before and after transformation 4' },
  { id: 'male-photo-05', src: male05, alt: 'Before and after transformation 5' },
  { id: 'male-photo-06', src: male06, alt: 'Before and after transformation 6' },
  { id: 'male-photo-07', src: male07, alt: 'Before and after transformation 7' },
  { id: 'male-photo-08', src: male08, alt: 'Before and after transformation 8' },
  { id: 'male-photo-09', src: male09, alt: 'Before and after transformation 9' },
  { id: 'male-photo-10', src: male10, alt: 'Before and after transformation 10' },
  { id: 'male-photo-11', src: male11, alt: 'Before and after transformation 11' },
  { id: 'male-photo-12', src: male12, alt: 'Before and after transformation 12' },
]

const femalePhotoModules = import.meta.glob<string>('@assets/images/testimonials/female/*.png', {
  eager: true,
  import: 'default',
})

function buildFemaleTestimonialPhotos(): TestimonialPhoto[] {
  return Object.entries(femalePhotoModules)
    .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
    .map(([, src], index) => ({
      id: `female-photo-${index + 1}`,
      src,
      alt: `Before and after transformation ${index + 1}`,
    }))
}

const femaleTestimonialPhotos = buildFemaleTestimonialPhotos()

export function getTestimonialPhotos(audience: Audience): TestimonialPhoto[] {
  return audience === 'women' ? femaleTestimonialPhotos : maleTestimonialPhotos
}
