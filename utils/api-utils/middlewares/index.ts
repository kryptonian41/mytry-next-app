import { NextApiRequest, NextApiResponse } from "next"
import { validateToken } from "pages/api/users/validate"

export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const authMiddleware = async (req: NextApiRequest, _res: NextApiResponse, cb) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const result = await validateToken({
      JWT: token
    })
    cb(result)
  } catch (error) {
    cb(error)
  }
}
