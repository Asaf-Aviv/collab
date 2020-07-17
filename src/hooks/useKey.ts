import { useEffect, useRef } from 'react'

export const useKey = (
  keys: Array<KeyboardEvent['key']>,
  callback: () => void,
  when?: boolean,
) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    if (when === false) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        callbackRef.current()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line
  }, [when, ...keys])
}
