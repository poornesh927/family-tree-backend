const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "viewer" }, // 'admin' or 'viewer'
  family: { type: String, required: true },
  approved: { type: Boolean, default: false } // admin will approve user
});

module.exports = mongoose.model("User", UserSchema);
