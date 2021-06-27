import { wooClient } from "../../utils/api-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export const getReviewsServerSide = async (queryParams = {}) =>
  await wooClient.get("products/reviews", queryParams);

export const createReview = async (body = {}) =>
  await wooClient.post("products/reviews", body);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data } = await createReview(req.body);
    res.status(201).json(data);
  } else if (req.method === "GET") {
    const { data } = await getReviewsServerSide(req.query);
    res.json(data);
  } else res.status(405).json("");
};
