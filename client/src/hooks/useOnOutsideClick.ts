import { useEffect, RefObject, useRef } from 'react'

export const useOnOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  active = true,
) => {
  const cbRef = useRef(callback)

  useEffect(() => {
    cbRef.current = callback
  }, [callback])

  useEffect(() => {
    if (active === false) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) return
      cbRef.current()
    }

    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick as any)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick as any)
    }
  }, [ref, active])
}
