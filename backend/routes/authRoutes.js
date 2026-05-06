const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyClientToken } = require("../middlewares/authMiddleware");

// Routes Client
router.post("/client/signup", authController.signupClient);
router.post("/client/login", authController.loginClient);
router.post("/client/logout", verifyClientToken, authController.logoutClient);

// Routes Admin
router.post("/admin/login", authController.loginAdmin);

module.exports = router;
