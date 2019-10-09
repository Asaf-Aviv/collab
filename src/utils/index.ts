import { sign, verify } from 'jsonwebtoken';

// atleast eight characters, one letter and one number
export const emailRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// 3,16 characters, letters numbers and underscores only
export const usernameRegex = /^[\w]{3,16}$/;

// atleast eight characters, one letter and one number
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const generateToken = <T>(body: T extends object ? T : never): Promise<string> => (
  new Promise((resolve, reject) => {
    sign({ ...body }, process.env.JWT_SECRET as string, (err, encoded) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(encoded);
    });
  })
);

export const decodeToken = <T extends object>(token: string): Promise<T> => (
  new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(decoded as T);
    });
  })
);
