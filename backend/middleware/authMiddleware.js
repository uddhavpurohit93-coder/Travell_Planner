const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    // 🔥 IMPORTANT FIX
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, "secret");

    req.user = decoded;
    next();

  } catch (err) {
    console.log("TOKEN ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;