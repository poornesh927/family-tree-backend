const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Upload one file (image/pdf)
router.post("/single", verifyToken, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  res.status(200).json({
    msg: "File uploaded successfully",
    path: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
