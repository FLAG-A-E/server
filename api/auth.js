// /api/auth.js
import ImageKit from "imagekit";

export default function handler(req, res) {
  // ترويسة CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // السماح لكل الدومينات
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight request
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC,
    privateKey: process.env.IMAGEKIT_PRIVATE,
    urlEndpoint: process.env.IMAGEKIT_URL
  });

  const auth = imagekit.getAuthenticationParameters();

  res.status(200).json(auth);
}

