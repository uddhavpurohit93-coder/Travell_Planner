const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔴 check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });cd

    await user.save();

    res.json({ message: "User Registered ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup error ❌" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Wrong password ❌" });
    }

    const token = jwt.sign({ id: user._id }, "secret");

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Login error ❌" });
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