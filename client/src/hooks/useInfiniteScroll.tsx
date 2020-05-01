import React, { useEffect, useRef } from 'react'

export const useInfiniteScroll = (
  callback: () => void,
  active: boolean | undefined | null,
  threshold = 400,
) => {
  const triggerRef = useRef<HTMLSpanElement | null>(null)
  const cbRef = useRef(callback)

  useEffect(() => {
    cbRef.current = callback
  }, [callback])

  useEffect(() => {
    const node = triggerRef.current
    console.log(node)

    if (!node || !active) return

    const options = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          console.log('executing')
          cbRef.current()
        }
      })
    }, options)

    observer.observe(node)

    return () => observer.unobserve(node)
  }, [active])

  return <span ref={triggerRef} />
}
