export type FaqVideo = {
  id: string
  title: string
  vimeoId: string
}

export const faqVideos: FaqVideo[] = [
  {
    id: 'personal-trainer',
    title: "What's the difference between this and a personal trainer?",
    vimeoId: '1190112085',
  },
  {
    id: 'how-program-works',
    title: 'How does this program work?',
    vimeoId: '1190112071',
  },
  {
    id: 'results-guaranteed',
    title: 'Are results guaranteed?',
    vimeoId: '1190112057',
  },
  {
    id: 'how-fast-results',
    title: 'How fast will I see results?',
    vimeoId: '1190112039',
  },
  {
    id: 'real-results',
    title: 'What real results have come from the program?',
    vimeoId: '1190112018',
  },
  {
    id: 'time-commitment',
    title: 'How much time will I need to commit to see results?',
    vimeoId: '1190111998',
  },
]
