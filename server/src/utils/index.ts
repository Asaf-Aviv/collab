import { sign, verify } from 'jsonwebtoken'

type TokenBody = {
  userId: string
}

export const generateToken = (body: TokenBody) =>
  new Promise<string>((resolve, reject) => {
    sign(
      body,
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
      (err, encoded) => {
        if (err) {
          reject(err)
          return
        }

        resolve(encoded)
      },
    )
  })

export const decodeToken = (token: string) =>
  new Promise<TokenBody>((resolve, reject) => {
    verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject(err)
        return
      }

      resolve(decoded as TokenBody)
    })
  })
