import { wooClient } from "../../api-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export const getReviewsServerSide = async (queryParams = {}) =>
  await wooClient.get("products/reviews", queryParams);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await getReviewsServerSide(req.query);
  res.json(data);
};
