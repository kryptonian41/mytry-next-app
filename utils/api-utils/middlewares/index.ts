import { NextApiRequest, NextApiResponse } from "next"
import { getUser, updateUser } from "pages/api/users/me"
import { validateToken } from "pages/api/users/validate"
import { MytryOrder, Order, User } from "types/commons"
import { addShippingAddress, getShippingAddressByID } from "../shipping-address"
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


export const shippingAddressMiddleWare = async (req: NextApiRequestWithAuth, _res: NextApiResponse, cb) => {
  try {
    const userData = await getUser(req.user.ID) as User
    const { mytryMetaData: { shipping_address_id, saveAddress }, billing: shippingAddress } = req.body as MytryOrder

    if (shipping_address_id) {
      const address = getShippingAddressByID(userData, shipping_address_id)
      if (!address) throw Error(`Address with ID:${shipping_address_id} not found`)
      cb(address)
    } else {
      if (saveAddress) {
        const updatedUserData = addShippingAddress(userData, shippingAddress)
        await updateUser(userData.id, updatedUserData)
      }
      cb(shippingAddress)
    }
  } catch (error) {
    cb(error)
  }
}