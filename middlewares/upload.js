const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Folder name in Cloudinary
    format: async (req, file) => 'jpg', // Force images to be .jpg
    public_id: (req, file) => file.originalname.split('.')[0] // Use file name as public_id
  }
});

const upload = multer({ storage });

module.exports = upload;