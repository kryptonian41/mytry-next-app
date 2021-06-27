import { wooClient } from "utils/api-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export const registerUser = async (body = {}) => {
  let response;
  try {
    response = await wooClient.post("customers", body);
  } catch (error) {
    response = error.response;
  }
  return response;
};

// TODO - if request is made without proper request body, respond with 400

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const response = await registerUser(req.body);
    res.status(response.status).json(response.data);
  } else res.status(405).json("");
};
