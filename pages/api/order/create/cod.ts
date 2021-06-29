import type { NextApiRequest, NextApiResponse } from "next";
import { wooClient } from "utils/api-utils";
import { authMiddleware, runMiddleware } from "utils/api-utils/middlewares";
import { razorpayClient } from "utils/api-utils/razorpay-client";


export const createCODOrderServerSide = async (order: any) => {
  const { data } = await wooClient.get('shipping/zones/1/methods/1')
  const shipping_lines = [{
    "method_id": data.method_id,
    "method_title": data.method_title,
    "total": data.settings.cost.value
  }]
  const newOrderBody = { ...order, shipping_lines, status: "processing" }
  const { data: orderDetails } = await wooClient.post("orders", newOrderBody)
  return orderDetails
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await runMiddleware(req, res, authMiddleware)
    const orderDetails = await createCODOrderServerSide(req.body);
    res.json(orderDetails)
  }
};
