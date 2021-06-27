import { wooClient } from "../../utils/api-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export const getCategoriesServerSide = async (queryParams = {}) =>
  await wooClient.get("products/categories", queryParams);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await getCategoriesServerSide(req.query);
  res.json(data);
};
