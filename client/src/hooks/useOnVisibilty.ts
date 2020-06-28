import { useEffect, useRef, MutableRefObject } from 'react'

export const useOnVisibilty = (
  ref: MutableRefObject<Element | null>,
  callback: () => void,
  active: boolean | undefined | null,
  threshold = 400,
) => {
  if (!ref) {
    throw new Error('You must pass a ref object')
  }

  const cbRef = useRef(callback)

  useEffect(() => {
    cbRef.current = callback
  }, [callback])

  useEffect(() => {
    const node = ref.current

    if (!node || !active) return

    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          cbRef.current()
        }
      })
    }, options)

    observer.observe(node)

    return () => observer.unobserve(node)
  }, [active, threshold, ref])
}
