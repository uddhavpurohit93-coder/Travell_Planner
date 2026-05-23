/**
 * Run once: node scripts/seedAdmin.js
 * Sets isAdmin=true for your Gmail in the database.
 * Safe to run multiple times — idempotent.
 */
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const User = require("../models/userModel");

const ADMIN_EMAIL = "romizofficial@gmail.com"; // ← your Gmail stored as admin

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel");
    console.log("✅ MongoDB connected");

    const user = await User.findOne({ email: ADMIN_EMAIL });
    if (!user) {
      console.log(`⚠️  User not found: ${ADMIN_EMAIL}`);
      console.log("→ Sign up with this email first, then re-run this script.");
      process.exit(1);
    }

    if (user.isAdmin) {
      console.log(`✅ ${ADMIN_EMAIL} is already an admin.`);
    } else {
      user.isAdmin = true;
      await user.save();
      console.log(`🚀 ${ADMIN_EMAIL} granted admin access!`);
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
