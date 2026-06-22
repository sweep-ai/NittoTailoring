import type { Audience } from '@/config/audience'

export type TestimonialVideo = {
  id: string
  vimeoId: string
  vimeoHash: string
  title: string
  audience: Audience
}

export const testimonialVideos: TestimonialVideo[] = [
  {
    id: 'testimonial-1',
    vimeoId: '1190754583',
    vimeoHash: '5469661d8c',
    title: 'Member testimonial 1',
    audience: 'men',
  },
  {
    id: 'testimonial-2',
    vimeoId: '1190797944',
    vimeoHash: 'd2371243a5',
    title: 'Member testimonial 2',
    audience: 'men',
  },
  {
    id: 'testimonial-3',
    vimeoId: '1190753850',
    vimeoHash: '76e4790265',
    title: 'Member testimonial 3',
    audience: 'men',
  },
  {
    id: 'testimonial-4',
    vimeoId: '1190753671',
    vimeoHash: 'f4f64ed063',
    title: 'Member testimonial 4',
    audience: 'men',
  },
  {
    id: 'testimonial-5',
    vimeoId: '1190754096',
    vimeoHash: '2a1286a7b6',
    title: 'Member testimonial 5',
    audience: 'men',
  },
  {
    id: 'testimonial-6',
    vimeoId: '1190754619',
    vimeoHash: '84536d1dba',
    title: 'Member testimonial 6',
    audience: 'men',
  },
  {
    id: 'testimonial-7',
    vimeoId: '1190754322',
    vimeoHash: '7f7e768c79',
    title: 'Member testimonial 7',
    audience: 'men',
  },
  {
    id: 'testimonial-8',
    vimeoId: '1190754414',
    vimeoHash: '514163e7a4',
    title: 'Member testimonial 8',
    audience: 'men',
  },
  {
    id: 'testimonial-9',
    vimeoId: '1190752298',
    vimeoHash: '290bea3008',
    title: 'Member testimonial 9',
    audience: 'men',
  },
  {
    id: 'testimonial-10',
    vimeoId: '1190752177',
    vimeoHash: 'ecdb519e27',
    title: 'Member testimonial 10',
    audience: 'men',
  },
]

export function getTestimonialVideos(audience: Audience): TestimonialVideo[] {
  return testimonialVideos.filter((video) => video.audience === audience)
}

export function getFeaturedTestimonialVideos(audience: Audience): TestimonialVideo[] {
  return getTestimonialVideos(audience).slice(0, 3)
}
