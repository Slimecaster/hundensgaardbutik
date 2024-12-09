const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const imageUpload = require('../middlewares/imageUpload'); // Import the image upload middleware
const security = require("../middlewares/security");


router.get('/', itemController.getHomepage);

// Route for creating a new item with image upload
router.post('/createItem', security.checkRole("admin"), imageUpload.single('image'), itemController.createItem);

// Route for updating an item with image upload
router.post('/item/:id/update',security.checkRole("admin"), imageUpload.single('image'), itemController.updateItem);

router.post('/item/:id/delete',security.checkRole("admin"), itemController.deleteItem);

module.exports = router;
