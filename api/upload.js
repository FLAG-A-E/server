const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    const auth = imagekit.getAuthenticationParameters();
    return res.json(auth);
  }
  
  if (req.method === 'POST') {
    try {
      const { file, fileName } = req.body;
      
      const result = await imagekit.upload({
        file: file,
        fileName: fileName || `upload-${Date.now()}`
      });
      
      return res.json({
        success: true,
        url: result.url
      });
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  res.status(405).json({ error: 'Method not allowed' });
};
