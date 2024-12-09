const express = require("express");
const userController = require("../controllers/userController");
const security = require("../middlewares/security");
const router = express.Router();

router.get('/login', security.rateLimitMiddleware, userController.getLogin);
router.get('/logout', security.checkRole("admin"), userController.logout)
router.get('/dashboard', security.rateLimitMiddleware, security.checkRole("admin"), userController.getDashboard);
router.get('/createItem', security.checkRole("admin"), userController.getCreateItem)
router.get('/inventory', security.checkRole("admin"), userController.getAllItems)
router.get('/item/:id/update',security.checkRole("admin"),userController.getItemById)

router.post('/create-user',userController.CreateUser)
router.post('/login', security.rateLimitMiddleware, userController.login);


module.exports = router;
