import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const validateToken = async (body = {}) => {
  const { JWT } = body as any;
  let response;
  try {
    response = await axios.get(process.env.WCOMM_DOMAIN, {
      params: {
        rest_route: `${process.env.JWT_NAMESPACE}/auth/validate`,
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
    const response = await validateToken(req.body);
    res.status(response.status).json(response.data);
  } else res.status(405).json("");
};
