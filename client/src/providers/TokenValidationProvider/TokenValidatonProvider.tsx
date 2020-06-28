import React, { createContext, useState, useMemo, useContext } from 'react'

type TokenValidationContext = {
  hasBeenValidated: boolean
  setHasBeenValidated: React.Dispatch<React.SetStateAction<boolean>>
}

const TokenValidationContext = createContext<TokenValidationContext>(
  {} as TokenValidationContext,
)

type Props = {
  children: React.ReactNode
}

export const TokenValidationProvider = ({ children }: Props) => {
  const [hasBeenValidated, setHasBeenValidated] = useState(false)

  const tokenValidationValue = useMemo(
    () => ({
      hasBeenValidated,
      setHasBeenValidated,
    }),
    [hasBeenValidated],
  )

  return (
    <TokenValidationContext.Provider value={tokenValidationValue}>
      {children}
    </TokenValidationContext.Provider>
  )
}

export const useTokenValidation = () => useContext(TokenValidationContext)
