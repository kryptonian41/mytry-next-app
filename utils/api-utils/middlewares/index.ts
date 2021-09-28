import { NextApiRequest, NextApiResponse } from "next";
import { getUserServerSide, updateUserServerSide } from "pages/api/users/me";
import { validateToken } from "pages/api/users/validate";
import { Address, MetaInfo, MytryOrder, Order, User } from "types/commons";
import { convertAddressToShippingFormInfo } from "utils";
import {
  addShippingAddress,
  getShippingAddressByID,
} from "../shipping-address";
export interface NextApiRequestWithAuth extends NextApiRequest {
  user: {
    ID: string;
  };
}

export function runMiddleware<T = unknown>(
  req: NextApiRequest,
  res: NextApiResponse,
  fn
) {
  return new Promise<T>((resolve, reject) => {
    fn(req, res, (result: T | Error) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const authMiddleware = async (
  req: NextApiRequestWithAuth,
  _res: NextApiResponse,
  cb
) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const result = await validateToken({
      JWT: token,
    });
    req.user = result.data.data.user;
    cb(result);
  } catch (error) {
    cb(error);
  }
};

export interface ShippingMiddlewareResponse {
  shippingAddress: Address;
  updatedUserData?: User;
}

export const shippingAddressMiddleware = async (
  req: NextApiRequestWithAuth,
  _res: NextApiResponse,
  cb
) => {
  try {
    let response: ShippingMiddlewareResponse;
    const userData = await getUserServerSide(req.user.ID);
    const {
      mytryMetaData: { saveAddress, saveAddressAs },
      billing: shippingAddress,
    } = req.body as MytryOrder;
    if (saveAddress) {
      const updatedUserMetaData = addShippingAddress(
        userData,
        convertAddressToShippingFormInfo(shippingAddress, {
          saveAddressAs,
        })
      );
      const updatedUserData = await updateUserServerSide(userData.id, {
        meta_data: updatedUserMetaData,
      });
      response = { ...response, updatedUserData };
    }
    response = { shippingAddress };
    cb(response);
  } catch (error) {
    cb(error);
  }
};
