const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required ❌"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists ❌"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // 🔥 TOKEN GENERATE
    const token = jwt.sign(
      { id: user._id },
      "secret",
      { expiresIn: "7d" }
    );

    // ✅ FINAL RESPONSE
    res.status(201).json({
      success: true,
      message: "Signup successful ✅",
      token
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Signup error ❌"
    });
  }
};
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found ❌"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong password ❌"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret",
      { expiresIn: "7d" }
    );

    // ✅ FINAL RESPONSE
    res.status(200).json({
      success: true,
      message: "Login successful ✅",
      token
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Login error ❌"
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("DATA:", req.body); // 🔥 debug

    if (!name || !email || !password) {
      return res.json({ message: "All fields required ❌" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "Signup successful ✅" });

  } catch (err) {
    console.log("ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: "Signup error ❌" });
  }
};