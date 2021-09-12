import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "./validate";
import { wooClient } from "utils/api-utils";
import { User } from "types/commons";

export const getUserServerSide = async (id) => {
  const { data } = await wooClient.get(`customers/${id}`)
  return data
};

export const updateUserServerSide = async (id, userData: Partial<User>) => {
  const { data } = await wooClient.put(`customers/${id}`, userData)
  return data
}

const getUserIdFromAuthorizationHeader = async (authorizationHeader: string) => {
  const JWT = authorizationHeader.substr(authorizationHeader.indexOf("ey"), authorizationHeader.length);
  const response = await validateToken({ JWT });
  if (response.status === 201) {
    return response.data.data.user.ID
  } else throw new Error(response.data.data.message)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let userDetails: User
    if (req.headers.authorization) {
      const userId = await getUserIdFromAuthorizationHeader(req.headers.authorization)
      if (!userId) throw "Invalid Authorization Header"
      userDetails = await getUserServerSide(userId);
    }
    else return res.status(405).send("Bad Request");
    if (req.method === "GET") {
      res.json(userDetails)
    }

    else if (req.method === 'PUT') {
      const updatedUserData = await updateUserServerSide(userDetails.id, req.body)
      res.json(updatedUserData)
    }

  } catch (err) {
    res.status(405).json({ message: err.message });
  }
};
