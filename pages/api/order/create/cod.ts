import type { NextApiRequest, NextApiResponse } from "next";
import { Address, MytryOrder } from "types/commons";
import { wooClient } from "utils/api-utils";
import { authMiddleware, runMiddleware, shippingAddressMiddleware, ShippingMiddlewareResponse } from "utils/api-utils/middlewares";


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
    const { shippingAddress, updatedUserData } = await runMiddleware<ShippingMiddlewareResponse>(req, res, shippingAddressMiddleware)
    const { mytryMetaData, ...order } = req.body as MytryOrder
    const orderDetails = await createCODOrderServerSide({ ...order, shipping: shippingAddress, billing: shippingAddress });
    const response: Record<string, any> = { orderDetails }
    if (updatedUserData) response.updatedUserData = updatedUserData
    res.json(response)
  }
};
