const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const familyRoutes = require("./routes/familyRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const User = require("./models/User"); // 🧠 Import User model
const bcrypt = require("bcryptjs");
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/family", familyRoutes);


app.use('/api/users', userRoutes);


// Access files via /uploads/file.png
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // ✅ Create Default Admin if not exists
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
  .catch(err => console.error("MongoDB connection error:", err));
