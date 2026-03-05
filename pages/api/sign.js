import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { data } = req.body;
  if (!data) return res.status(400).json({ error: "No data provided" });

  const secret = process.env.SECRET_KEY;
  if (!secret) return res.status(500).json({ error: "SECRET_KEY missing" });

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");

  res.status(200).json({ signature });
}
