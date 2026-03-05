import ImageKit from "imagekit";



export default async function handler(req, res) {

  // الحصول على توكن الرفع
  if (req.method === "GET") {
    const result = imagekit.getAuthenticationParameters();
    return res.status(200).json(result);
  }

  // حذف الصور
  if (req.method === "POST") {
    const { fileIds } = req.body;

    if (!Array.isArray(fileIds)) {
      return res.status(400).json({ error: "fileIds required" });
    }

    try {
      for (const id of fileIds) {
        await imagekit.deleteFile(id);
      }

      return res.status(200).json({ success: true });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

