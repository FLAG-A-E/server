import ImageKit from "imagekit";



export default function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  const result = imagekit.getAuthenticationParameters();

  res.status(200).json(result);
}
