const express = require("express");
const router = express.Router();
const statController = require("../controllers/statController");
const { verifyAdminToken } = require("../middlewares/authMiddleware");

// Admin
router.get("/", verifyAdminToken, statController.getStatistics);

module.exports = router;
