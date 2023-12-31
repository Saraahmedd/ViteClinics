const express = require("express");
const authController = require("../controllers/authController");
const notificationController = require("../controllers/notificationsController");
const router = express.Router();

router.use(authController.protect);
router.patch("/:id", notificationController.updateNotification);
router.get("/", notificationController.getNotifications);

module.exports = router;
