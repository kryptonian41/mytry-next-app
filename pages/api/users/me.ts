import type { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "./validate";
import { wooClient } from "utils/api-utils";
import { User } from "types/commons";

export const getUser = async (id) => await wooClient.get(`customers/${id}`);
export const updateUser = async (id, userData: User) => {
  await wooClient.put(`customers/${id}`, userData)
}
// TODO - if request is made without proper request body, respond with 400

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    if (req.headers.authorization) {
      try {
        const auth = req.headers.authorization;
        const JWT = auth.substr(auth.indexOf("ey"), auth.length);
        const response = await validateToken({ JWT });
        if (response.status === 201) {
          const userRes = await getUser(response.data.data.user.ID);
          res.status(userRes.status).json(userRes.data);
        } else throw new Error(response.data.data.message);
      } catch (err) {
        res.status(405).json({ message: err.message });
      }
    } else res.status(405).json("");
  } else res.status(405).json("");
};
