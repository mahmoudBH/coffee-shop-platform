const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyAdminToken, verifyClientToken } = require("../middlewares/authMiddleware");

// Route pour les clients (Créer une commande)
// Optionnel: Protéger par verifyClientToken si seuls les utilisateurs connectés peuvent commander
router.post("/", orderController.createOrder);

// Routes pour les administrateurs
router.get("/", verifyAdminToken, orderController.getAllOrders);
router.post("/:id/pay", verifyAdminToken, orderController.payOrder);

module.exports = router;
