import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "types/commons";
import { wooClient } from "utils/api-utils";

export const createOrder = async (order: Order) => {
  await wooClient.post("orders", order)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await createOrder(req.body);
    res.send({ success: true })
  }
};
