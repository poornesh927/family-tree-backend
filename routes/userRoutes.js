const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // don’t send passwords
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Approve a user
router.put('/approve/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ msg: "User approved" });
  } catch (err) {
    res.status(500).json({ msg: "Error approving user" });
  }
});
// Change role (admin/user)
router.put('/role/:id', async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role });
    res.json({ msg: `Role updated to ${role}` });
  } catch (err) {
    res.status(500).json({ msg: "Error updating role" });
  }
});

// Toggle block/unblock
router.put('/block/:id', async (req, res) => {
  const { blocked } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { blocked });
    res.json({ msg: blocked ? "User blocked" : "User unblocked" });
  } catch (err) {
    res.status(500).json({ msg: "Error updating block status" });
  }
});



module.exports = router;
