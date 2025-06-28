const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController'); // create next
// const { verifyAdmin } = require('../middleware/authMiddleware'); // optional middleware

// GET /api/admin/users
// router.get('/users', verifyAdmin, getAllUsers); // You can remove `verifyAdmin` for now

module.exports = router;router.get('/users', getAllUsers);

