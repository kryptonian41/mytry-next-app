import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export const getUser = async (headers = {}) => {
  const { authorization } = headers as any;
  const config = authorization ? { headers: { authorization } } : {};
  let response;
  try {
    response = await axios.get(
      `${process.env.WCOMM_DOMAIN}/wp-json/wp/v2/users/me`,
      config
    );
  } catch (error) {
    response = error.response;
  }

  return response;
};

// TODO - if request is made without proper request body, respond with 400

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const response = await getUser(req.headers);
    res.status(response.status).json(response.data);
  } else res.status(405).json("");
};
