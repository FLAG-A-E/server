import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL
});

export default function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  const auth = imagekit.getAuthenticationParameters();

  res.status(200).json(auth);
}
