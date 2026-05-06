const express = require("express");
const router = express.Router();
const packController = require("../controllers/packController");
const { verifyAdminToken } = require("../middlewares/authMiddleware");

// Public ou Client
router.get("/", packController.getAllPacks);

// Admin
router.post("/", verifyAdminToken, packController.createPack);
router.delete("/:id", verifyAdminToken, packController.deletePack);

module.exports = router;
