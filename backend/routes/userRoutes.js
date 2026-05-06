const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyClientToken, verifyAdminToken } = require("../middlewares/authMiddleware");

// --- Client Profil ---
router.get("/profile", verifyClientToken, userController.getClientProfile);
router.put("/profile", verifyClientToken, userController.updateClientProfile);
router.put("/change-password", verifyClientToken, userController.changeClientPassword);

// --- Admin Profil ---
router.get("/admin/profile", verifyAdminToken, userController.getAdminProfile);
router.post("/admin/profile/update/email", verifyAdminToken, userController.updateAdminEmail);
router.post("/admin/profile/update/password", verifyAdminToken, userController.updateAdminPassword);

// --- Liste des Utilisateurs (Admin) ---
router.get("/", verifyAdminToken, userController.getAllUsers);

module.exports = router;
