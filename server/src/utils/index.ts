import { sign, verify } from 'jsonwebtoken'

// 3,16 characters, letters numbers and underscores only
export const usernameRegex = /^[\w]{3,16}$/

// atleast eight characters, one letter and one number
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

type TokenBody = {
  userId: string
}

export const generateToken = (body: TokenBody) =>
  new Promise<string>((resolve, reject) => {
    sign(body, process.env.JWT_SECRET as string, (err, encoded) => {
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
