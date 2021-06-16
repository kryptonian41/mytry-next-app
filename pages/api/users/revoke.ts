import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const revokeToken = async (body = {}) => {
  const { JWT } = body as any;
  let response;
  try {
    response = await axios.post(process.env.WCOMM_DOMAIN, null, {
      params: {
        rest_route: `${process.env.JWT_NAMESPACE}/auth/revoke`,
        JWT,
      },
    });
    response.status = 201;
  } catch (error) {
    response = error.response;
  }

  return response;
};

// TODO - if request is made without proper request body, respond with 400

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const response = await revokeToken(req.body);
    res.status(response.status).json(response.data);
  } else res.status(405).json("");
};
