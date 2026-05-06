const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { verifyAdminToken } = require("../middlewares/authMiddleware");
const { uploadGeneral } = require("../middlewares/uploadMiddleware");

// --- Événements ---
router.get("/", eventController.getAllEvents);
router.post("/", verifyAdminToken, uploadGeneral.single('photo'), eventController.addEvent);

// --- Tables ---
router.get("/tables", eventController.getAllTables);
router.put("/tables/:id", verifyAdminToken, eventController.updateTableStatus);

// --- Capacité ---
router.get("/capacity", eventController.getCapacity);

module.exports = router;
