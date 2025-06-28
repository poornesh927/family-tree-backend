const express = require("express");
const { createFamily, getFamilyByName, addMember } = require("../controllers/familyController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// POST /api/family
router.post("/", verifyToken, createFamily);

// GET /api/family/:familyName
router.get("/:familyName", verifyToken, getFamilyByName);

// POST /api/family/:familyName/member/:parentId
router.post("/:familyName/member/:parentId", verifyToken, addMember);

module.exports = router;
