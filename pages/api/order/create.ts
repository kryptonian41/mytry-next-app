import type { NextApiRequest, NextApiResponse } from "next";
import { wooClient } from "utils/api-utils";
import { authMiddleware, runMiddleware } from "utils/api-utils/middlewares";
import { razorpayClient } from "utils/api-utils/razorpay-client";


export const createOrderServerSide = async (order: any) => {
  const { data } = await wooClient.get('shipping/zones/1/methods/1')
  const shipping_lines = [{
    "method_id": data.method_id,
    "method_title": data.method_title,
    "total": data.settings.cost.value
  }]
  const { data: orderDetails } = await wooClient.post("orders", { ...order, shipping_lines })
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
