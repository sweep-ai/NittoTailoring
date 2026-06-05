export function preloadImages(urls: string[]): Promise<void> {
  const unique = [...new Set(urls)]

  return Promise.all(
    unique.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.decoding = 'async'
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        }),
    ),
  ).then(() => undefined)
}
