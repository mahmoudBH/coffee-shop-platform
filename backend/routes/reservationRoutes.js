const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { verifyAdminToken } = require("../middlewares/authMiddleware");

// Client
router.post("/", reservationController.createReservation);

// Admin
router.get("/", verifyAdminToken, reservationController.getAllReservations);
router.put("/:id", verifyAdminToken, reservationController.updateReservationStatus);

module.exports = router;
