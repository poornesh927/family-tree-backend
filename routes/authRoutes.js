const express = require("express");
const { signup, login, getPendingUsers, approveUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/pending", getPendingUsers); // admin only
router.post("/approve", approveUser);    // admin only

module.exports = router;
