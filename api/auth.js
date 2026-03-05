import ImageKit from "imagekit";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // الحد الأقصى لحجم الصورة
    },
  },
};

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  try {
    const { fileName, fileBase64 } = req.body;
    if (!fileName || !fileBase64)
      return res.status(400).json({ error: "fileName and fileBase64 are required" });

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC,
      privateKey: process.env.IMAGEKIT_PRIVATE,
      urlEndpoint: process.env.IMAGEKIT_URL,
    });

    const uploadResult = await imagekit.upload({
      file: fileBase64,
      fileName,
      useUniqueFileName: true,
      folder: "/uploads"
    });

    res.status(200).json(uploadResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
