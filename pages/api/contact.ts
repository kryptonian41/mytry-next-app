import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

const createMsg = (subject, email, html) => ({
  to: "mytryskin@gmail.com",
  from: {
    email: "mytryskin@gmail.com",
    name: "Mytry Skin",
  },
  replyTo: email,
  subject,
  html,
});

const sendMail = async ({ subject, email, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let res;
  try {
    res = await sgMail.send(createMsg(subject, email, html));
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
  if (res.length) return res[0];
  return res;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const response = await sendMail(req.body);
    res.status(response.statusCode).json(response.body);
  } else res.status(405).json("");
};
