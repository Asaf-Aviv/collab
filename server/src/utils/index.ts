import { sign, verify } from 'jsonwebtoken'

// 3,16 characters, letters numbers and underscores only
export const usernameRegex = /^[\w]{3,16}$/

// atleast eight characters, one letter and one number
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

type TokenBody = {
  userId: string
}

export const TEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjNhZjU4ZC1lOTJiLTRhMTQtODNhZC1jM2ViNzI0YTE0OWIiLCJpYXQiOjE1ODI1MDAwMDMsImV4cCI6MTYxNDA1NzYwM30.j1EpuxjvsiNpqcyHPcXwt520pSdl5DY2JzF03mozsmo'

export const generateToken = (body: TokenBody) =>
  new Promise<string>((resolve, reject) => {
    sign(body, process.env.JWT_SECRET as string, { expiresIn: '1y' }, (err, encoded) => {
      if (err) {
        reject(err)
        return
      }

      resolve(encoded)
    })
  })

export const decodeToken = (token: string): Promise<TokenBody> =>
  new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject(err)
        return
      }

      resolve(decoded as TokenBody)
    })
  })
