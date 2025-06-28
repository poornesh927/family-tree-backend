const express = require("express");
const {
  createFamily,
  getFamilyByName,
  addMember
} = require("../controllers/familyController");

const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadFilesAndAddMember } = require("../controllers/fileUploadController")

const router = express.Router();

// POST /api/family → Create new family
router.post("/", verifyToken, createFamily);

// GET /api/family/:familyName → Get entire family tree
router.get("/:familyName", verifyToken, getFamilyByName);

// POST /api/family/:familyName/member/:parentId → Add member to a family under parent/root
router.post("/:familyName/member/:parentId", verifyToken, addMember);

router.post(
  "/upload/:familyName/:parentId",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "aadhar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
    { name: "voter", maxCount: 1 }
  ]),
  uploadFilesAndAddMember
);

module.exports = router;
