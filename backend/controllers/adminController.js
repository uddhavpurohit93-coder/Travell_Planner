const User = require("../models/userModel");
const Trip = require("../models/tripModel");

// ── ANALYTICS OVERVIEW ─────────────────────────────────────────────────────
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrips = await Trip.countDocuments();

    // Trips per day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentTripsCount = await Trip.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
    const recentUsersCount = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    // Top destinations
    const topDestinations = await Trip.aggregate([
      { $group: { _id: "$destination", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Average budget
    const avgBudgetResult = await Trip.aggregate([
      { $group: { _id: null, avg: { $avg: "$budget" } } },
    ]);
    const avgBudget = avgBudgetResult[0]?.avg || 0;

    // Recent users & trips
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .select("name email createdAt isAdmin");

    const recentTrips = await Trip.find()
      .sort({ createdAt: -1 })
      .limit(8)
      .select("destination days budget createdAt userId");

    // Trips by day for chart (last 7 days)
    const tripsByDay = await Trip.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTrips,
        recentTripsCount,
        recentUsersCount,
        topDestinations,
        avgBudget: Math.round(avgBudget),
        recentUsers,
        recentTrips,
        tripsByDay,
      },
    });
  } catch (err) {
    console.error("ANALYTICS ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ALL USERS ──────────────────────────────────────────────────────────────
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email createdAt isAdmin")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ALL TRIPS ──────────────────────────────────────────────────────────────
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .sort({ createdAt: -1 })
      .select("destination days budget createdAt userId");
    res.json({ success: true, data: trips });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── DELETE USER ───────────────────────────────────────────────────────────
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isAdmin) return res.status(403).json({ success: false, message: "Cannot delete admin user" });
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── DELETE TRIP ───────────────────────────────────────────────────────────
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: "Trip not found" });
    res.json({ success: true, message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── TOGGLE ADMIN ROLE ─────────────────────────────────────────────────────
exports.toggleAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isAdmin) return res.status(403).json({ success: false, message: "Cannot demote super admin" });
    user.isAdmin = !user.isAdmin;
    await user.save();
    res.json({ success: true, message: `User role updated`, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
