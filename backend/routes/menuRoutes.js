const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { verifyAdminToken } = require("../middlewares/authMiddleware");

// Routes accessibles par tout le monde (Client & Admin)
router.get("/", menuController.getAllMenuItems);

// Routes protégées réservées à l'Administrateur
router.post("/", verifyAdminToken, menuController.addMenuItem);
router.put("/:id", verifyAdminToken, menuController.updateMenuItem);
router.delete("/:id", verifyAdminToken, menuController.deleteMenuItem);

module.exports = router;
