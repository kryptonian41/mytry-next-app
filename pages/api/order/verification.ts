import type { NextApiRequest, NextApiResponse } from "next";
import { wooClient } from "utils/api-utils";
import crypto from 'crypto'
import { razorpayClient } from "utils/api-utils/razorpay-client";

const createHmacDigest = (body: any, secret: string) => {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(JSON.stringify(body))
  return hmac.digest('hex')
}

const updateOrderStatus = async (orderId: string, orderStatus: string) => {
  const { data } = await wooClient.put(`orders/${orderId}`, {
    status: orderStatus
  })
  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const hmacDigest = createHmacDigest(req.body, process.env.RAZORPAY_WEBHOOK_SECRET)
    try {
      if (req.headers['x-razorpay-signature'] === hmacDigest) {
        const { entity: { order_id } } = req.body.payload.payment
        const rzpOrderDetails = await razorpayClient.orders.fetch(order_id)
        const orderID = rzpOrderDetails.receipt
        await updateOrderStatus(orderID, 'processing')
      }
    } catch (error) {
      console.log("🚀 ~ file: verification.ts ~ line 28 ~ error", error)
    }
    res.json({ status: 'ok' })
  }
};
