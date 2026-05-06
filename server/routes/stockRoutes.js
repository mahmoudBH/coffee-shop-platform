const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");
const { verifyAdminToken } = require("../middlewares/authMiddleware");

// Toutes les routes du stock sont protégées et réservées à l'admin
router.get("/", verifyAdminToken, stockController.getAllStock);
router.post("/", verifyAdminToken, stockController.addStockItem);
router.put("/:id", verifyAdminToken, stockController.updateStockQuantity);
router.delete("/:id", verifyAdminToken, stockController.deleteStockItem);

module.exports = router;
