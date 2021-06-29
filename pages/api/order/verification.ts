import type { NextApiRequest, NextApiResponse } from "next";
import { wooClient } from "utils/api-utils";
import { runMiddleware } from "utils/api-utils/middlewares";
import { razorpayClient } from "utils/api-utils/razorpay-client";
import morgan from 'morgan'
const logger = morgan('tiny')

export const updateOrder = async (orderId: string, updateData: any) => {
  const { data } = await wooClient.put(`orders/${orderId}`, updateData)
  return data
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, logger)
      const body = JSON.stringify(req.body),
        signature = req.headers['x-razorpay-signature'],
        secret = process.env.RAZORPAY_WEBHOOK_SECRET

      const validSignature = razorpayClient.validateWebhookSignature(body, signature, secret)

      if (validSignature) {
        const { entity: { order_id } } = req.body.payload.payment
        const rzpOrderDetails = await razorpayClient.orders.fetch(order_id)
        const orderID = rzpOrderDetails.receipt
        await updateOrder(orderID, {
          status: 'processing',
          transaction_id: order_id
        })
      } else {
        console.log('Payment Denied')
      }
    } catch (error) {
      console.log("🚀 ~ file: verification.ts ~ line 28 ~ error", error)
    }
    res.json({ status: 'ok' })
  }
};
