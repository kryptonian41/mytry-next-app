import { wooClient } from "../../api-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export const getReviews = async (queryParams = {}) =>
  await wooClient.get("products/reviews", queryParams);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await getReviews(req.query);
  res.json(data);
};
