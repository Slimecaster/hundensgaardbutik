const multer = require('multer');

// Configure multer to store imagesStatic in memory
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
