const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getHomepage)
router.get('/items', itemController.getAllItems);
router.post('/item', itemController.creatItem);
router.post('/item/:id/update', itemController.updateItem);
router.post('/item/:id/delete', itemController.deleteItem);

module.exports = router

module.exports = router
