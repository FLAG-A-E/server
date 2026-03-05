// /api/auth.js على Vercel
export default function handler(req, res) {
  // ترويسة CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // * = السماح لكل الدومينات
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight request
  }

  // توليد التوقيع من ImageKit
  const ImageKit = require("imagekit");
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  const signature = imagekit.getAuthenticationParameters();

  res.status(200).json(signature);
}
