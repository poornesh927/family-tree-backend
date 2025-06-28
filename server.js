const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const familyRoutes = require("./routes/familyRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require('./routes/userRoutes'); // ✅ Fixed import
const adminRoutes = require('./routes/adminRoutes'); // add this
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// Static route for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/users", userRoutes); // ✅ user routes
app.use('/api/admin', adminRoutes);
// MongoDB connection + create default admin
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Create default admin if not exists
    const existingAdmin = await User.findOne({ email: "admin@familytree.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const admin = new User({
        name: "Admin",
        email: "admin@familytree.com",
        password: hashedPassword,
        family: "Mangapuram",
        role: "admin",
        approved: true
      });
      await admin.save();
      console.log("✅ Default admin created: admin@familytree.com / admin123");
    } else {
      console.log("ℹ️  Admin already exists");
    }

    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
