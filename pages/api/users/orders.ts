import type { NextApiRequest, NextApiResponse } from "next";
import { wooClient } from "utils/api-utils";
import { authMiddleware, type NextApiRequestWithAuth, runMiddleware } from "utils/api-utils/middlewares";

const getUserOrdersServerSide = async (customerId: string) => {
  const { data } = await wooClient.get('orders', {
    customer: customerId
  })
  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await runMiddleware(req, res, authMiddleware)
    const orders = await getUserOrdersServerSide((req as NextApiRequestWithAuth).user.ID)
    res.json(orders)
  } else res.status(405).json("");
};
