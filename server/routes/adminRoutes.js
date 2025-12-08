const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getAllAppointments,
    deleteUser,
    getStats,
} = require("../controllers/adminController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.get("/users", protect, restrictTo("admin"), getAllUsers);
router.get("/appointments", protect, restrictTo("admin"), getAllAppointments);
router.delete("/user/:id", protect, restrictTo("admin"), deleteUser);
router.get("/stats", protect, restrictTo("admin"), getStats);

module.exports = router;
