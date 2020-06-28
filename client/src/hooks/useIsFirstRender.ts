import { useRef, useEffect } from 'react'

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return isFirstRender.current
}
