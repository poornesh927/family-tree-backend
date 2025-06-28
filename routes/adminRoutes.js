const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');

// Only add verifyAdmin if ready
router.get('/users', getAllUsers);

module.exports = router;
