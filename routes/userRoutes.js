const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// ✅ Get all users (admin only)
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Approve user
router.put('/approve/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ msg: "User approved" });
  } catch (err) {
    res.status(500).json({ msg: "Error approving user" });
  }
});

// ✅ Change role
router.put('/role/:id', verifyToken, requireAdmin, async (req, res) => {
  const { role } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { role });
    res.json({ msg: `Role updated to ${role}` });
  } catch (err) {
    res.status(500).json({ msg: "Error updating role" });
  }
});

// ✅ Block or unblock user
router.put('/block/:id', verifyToken, requireAdmin, async (req, res) => {
  const { blocked } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { blocked });
    res.json({ msg: blocked ? "User blocked" : "User unblocked" });
  } catch (err) {
    res.status(500).json({ msg: "Error updating block status" });
  }
});

module.exports = router;
