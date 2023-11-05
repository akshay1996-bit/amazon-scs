const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the directory where you want to save the files
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Set the filename with the original name and a timestamp to ensure uniqueness
      const extension = path.extname(file.originalname); // Get the original file extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.originalname.replace(extension, '') + '-' + uniqueSuffix + extension);
    },
  });

  module.exports = storage