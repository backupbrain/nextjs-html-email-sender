import { NextApiRequest, NextApiResponse } from "next";
import { nodemailer } from "nodemailer";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  console.log("body", req.body);
  const email = req.body.email;
  const html = req.body.html;

  // TODO: validate email

  if (!email || email === "") {
    return res.status(400).json({
      status: 'error',
      message: 'invalid_email'
    });
  }
  if (!html || html === "") {
    return res.status(400).json({
      status: 'error',
      message: 'invalid_html'
    });
  }
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_USERNAME,
      clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
      clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN
    }
  });
  let mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: "Test email",
    html
  }
  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: 'mailer_error' });
    }
    return res.json({
      status: 'success',
      message: 'email_sent'
    });
  });
}
