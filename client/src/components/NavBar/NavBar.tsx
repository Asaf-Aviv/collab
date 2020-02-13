import React, { useEffect } from 'react'

export const NavBar = () => {
  const foo = 1
  useEffect(() => {
    console.log(foo)
  }, [])
  return <div></div>
}
