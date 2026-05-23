const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAnalytics,
  getAllUsers,
  getAllTrips,
  deleteUser,
  deleteTrip,
  toggleAdmin,
} = require("../controllers/adminController");

// All admin routes require: valid JWT + isAdmin=true
router.get("/analytics", authMiddleware, adminMiddleware, getAnalytics);
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/trips", authMiddleware, adminMiddleware, getAllTrips);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);
router.delete("/trips/:id", authMiddleware, adminMiddleware, deleteTrip);
router.patch("/users/:id/toggle-admin", authMiddleware, adminMiddleware, toggleAdmin);

module.exports = router;
