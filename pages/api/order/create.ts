import type { NextApiRequest, NextApiResponse } from "next";
import { wooClient } from "utils/api-utils";
import { authMiddleware, runMiddleware } from "utils/api-utils/middlewares";
import { razorpayClient } from "utils/api-utils/razorpay-client";


const DUMMY_ORDER = {
  "payment_method": "razorpay",
  "payment_method_title": "Razorpay",
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US",
    "email": "john.doe@example.com",
    "phone": "(555) 555-5555"
  },
  "shipping": {
    "first_name": "John",
    "last_name": "Doe",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US"
  },
  "line_items": [
    {
      "product_id": 14,
      "quantity": 2
    },
  ],
}

export const createOrderServerSide = async (order: any) => {
  const { data: orderDetails } = await wooClient.post("orders", order)
  return orderDetails
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await runMiddleware(req, res, authMiddleware)
    const { id, total, currency } = await createOrderServerSide(DUMMY_ORDER);
    const orderPaymentDetails = await razorpayClient.orders.create({
      amount: parseInt(total) * 100,
      receipt: id,
      currency
    })
    res.json(orderPaymentDetails)
  }
};
