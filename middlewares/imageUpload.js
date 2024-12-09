const multer = require('multer');
const path = require('path');

// Configure multer storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/'); // Set the destination folder for images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid duplicates
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
