import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "types/commons";
import { wooClient } from "utils/api-utils";
import { authMiddleware, runMiddleware } from "utils/api-utils/middlewares";
import { razorpayClient } from "utils/api-utils/razorpay-client";


export const createOrderServerSide = async (order: any) => {
  const { data: orderDetails } = await wooClient.post("orders", order)
  return orderDetails
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await runMiddleware(req, res, authMiddleware)
    const { id, total, currency } = await createOrderServerSide(req.body);
    const orderPaymentDetails = await razorpayClient.orders.create({
      amount: parseInt(total) * 100,
      receipt: id,
      currency
    })
    res.json(orderPaymentDetails)
  }
};
