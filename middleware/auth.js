const jwt = require("jsonwebtoken");

// ✅ Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user object will be available in other routes
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// ✅ Middleware to check for admin role
exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};
