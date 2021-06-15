import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const registerUser = async (body = {}) => {
  const { firstName, lastName, email, password } = body as any;
  let response;
  try {
    response = await axios.post(process.env.WCOMM_DOMAIN, null, {
      params: {
        rest_route: "/simple-jwt-login/v1/users",
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        AUTH_KEY: process.env.AUTH,
      },
    });
    response.status = 201;
  } catch (error) {
    response = error.response;
  }

  return response;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const response = await registerUser(req.body);
    res.status(response.status).json(response.data);
  } else res.status(405).json("");
};
