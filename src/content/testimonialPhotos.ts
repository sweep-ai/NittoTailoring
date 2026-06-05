import photo01 from '@assets/images/testimonials/testimonial-01.png'
import photo02 from '@assets/images/testimonials/testimonial-02.png'
import photo03 from '@assets/images/testimonials/testimonial-03.png'
import photo04 from '@assets/images/testimonials/testimonial-04.png'
import photo05 from '@assets/images/testimonials/testimonial-05.png'
import photo06 from '@assets/images/testimonials/testimonial-06.png'
import photo07 from '@assets/images/testimonials/testimonial-07.png'
import photo08 from '@assets/images/testimonials/testimonial-08.png'
import photo09 from '@assets/images/testimonials/testimonial-09.png'
import photo10 from '@assets/images/testimonials/testimonial-10.png'
import photo11 from '@assets/images/testimonials/testimonial-11.png'
import photo12 from '@assets/images/testimonials/testimonial-12.png'

export type TestimonialPhoto = {
  id: string
  src: string
  alt: string
}

export const testimonialPhotos: TestimonialPhoto[] = [
  { id: 'photo-01', src: photo01, alt: 'Before and after transformation 1' },
  { id: 'photo-02', src: photo02, alt: 'Before and after transformation 2' },
  { id: 'photo-03', src: photo03, alt: 'Before and after transformation 3' },
  { id: 'photo-04', src: photo04, alt: 'Before and after transformation 4' },
  { id: 'photo-05', src: photo05, alt: 'Before and after transformation 5' },
  { id: 'photo-06', src: photo06, alt: 'Before and after transformation 6' },
  { id: 'photo-07', src: photo07, alt: 'Before and after transformation 7' },
  { id: 'photo-08', src: photo08, alt: 'Before and after transformation 8' },
  { id: 'photo-09', src: photo09, alt: 'Before and after transformation 9' },
  { id: 'photo-10', src: photo10, alt: 'Before and after transformation 10' },
  { id: 'photo-11', src: photo11, alt: 'Before and after transformation 11' },
  { id: 'photo-12', src: photo12, alt: 'Before and after transformation 12' },
]
