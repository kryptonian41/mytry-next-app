import type { NextApiRequest, NextApiResponse } from "next";
import { Address, MytryOrder, Order } from "types/commons";
import { wooClient } from "utils/api-utils";
import { authMiddleware, runMiddleware, shippingAddressMiddleware, ShippingMiddlewareResponse } from "utils/api-utils/middlewares";
import { razorpayClient } from "utils/api-utils/razorpay-client";


export const createRazorpayOrderServerSide = async (order: Order) => {
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
    const { shippingAddress, updatedUserData } = await runMiddleware<ShippingMiddlewareResponse>(req, res, shippingAddressMiddleware)
    const { mytryMetaData, ...order } = req.body as MytryOrder
    const { id, total, currency } = await createRazorpayOrderServerSide({ ...order, shipping: shippingAddress, billing: shippingAddress });
    const orderPaymentDetails = await razorpayClient.orders.create({
      amount: parseInt(total) * 100,
      receipt: id,
      currency
    })
    const response: Record<string, any> = { orderPaymentDetails }
    if (updatedUserData) response.updatedUserData = updatedUserData
    res.json(response)
  }
};
