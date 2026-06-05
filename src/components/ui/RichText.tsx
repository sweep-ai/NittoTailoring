import type { RichTextSegment } from '@/types/richText'

type RichTextProps = {
  segments: RichTextSegment[]
}

export function RichText({ segments }: RichTextProps) {
  return (
    <>
      {segments.map((segment, index) =>
        segment.bold ? <strong key={index}>{segment.text}</strong> : segment.text,
      )}
    </>
  )
}
