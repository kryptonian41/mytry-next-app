import { wooClient } from "utils/api-utils";
import { authMiddleware, runMiddleware } from "utils/api-utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";

const calculateCart = (couponData, cartTotal) => {
  let response = {
    data: {
      code: couponData.code,
      discount: 0,
      free_shipping: couponData.free_shipping,
    },
  };
  switch (couponData.discount_type) {
    case "percent":
      response.data.discount = Math.floor(
        cartTotal * (parseFloat(couponData.amount) / 100)
      );
      break;
    case "fixed_cart":
      response.data.discount = Math.min(
        Math.ceil(parseFloat(couponData.amount)),
        cartTotal
      );
      break;
    default:
      throw new Error("Invalid coupon code");
  }
  return response;
};

export const applyCoupon = async (body = {}) => {
  const { code, customer_id, cartTotal } = body as any;
  let response;
  try {
    const { data } = await wooClient.get("coupons", { code });
    if (data.length === 0) throw new Error("Invalid coupon code");
    const couponData = data[0];
    if (couponData.date_expires_gmt) {
      const now = new Date();
      const expiry = new Date(`${couponData.date_expires_gmt}+00:00`);
      if (expiry.getTime() <= now.getTime())
        throw new Error("The coupon has expired");
    }
    if (couponData.usage_limit) {
      if (couponData.usage_limit <= couponData.usage_count)
        throw new Error("The coupon usage limit has been reached");
    }
    if (couponData.usage_limit_per_user) {
      const userUsageCount = couponData.used_by.filter(
        (user) => user === customer_id.toString()
      ).length;
      if (userUsageCount >= couponData.usage_limit_per_user)
        throw new Error(
          `The coupon can only be used ${couponData.usage_limit_per_user} time(s) per user.`
        );
    }
    if (couponData.minimum_amount === "0.00") {
      if (cartTotal < parseFloat(couponData.minimum_amount))
        throw new Error(
          `Minimum spend for this coupon is INR ${couponData.minimum_amount}`
        );
    }
    if (couponData.maximum_amount === "0.00") {
      if (cartTotal < parseFloat(couponData.maximum_amount))
        throw new Error(
          `Maximum spend for this coupon is INR ${couponData.maximum_amount}`
        );
    }
    response = calculateCart(couponData, cartTotal);
  } catch (error) {
    response = error.respnse
      ? error.response
      : { status: 400, data: { message: error.message } };
  }
  return response;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await runMiddleware(req, res, authMiddleware);
    const response = await applyCoupon(req.body);
    res.status(response.status || 200).json(response.data);
  } else res.status(405).json("");
};
