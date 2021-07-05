import { NextApiRequest, NextApiResponse } from "next"
import { validateToken } from "pages/api/users/validate"
export interface NextApiRequestWithAuth extends NextApiRequest {
  user: {
    ID: string
  }
}

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


export const authMiddleware = async (req: NextApiRequestWithAuth, _res: NextApiResponse, cb) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const result = await validateToken({
      JWT: token
    })
    req.user = result.data.data.user
    cb(result)
  } catch (error) {
    cb(error)
  }
}
