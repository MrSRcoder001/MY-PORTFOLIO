import express from "express";
import multer from "multer";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, "resume.pdf"),
});

const upload = multer({ storage });

router.post("/upload", protect, upload.single("resume"), (req, res) => {
  res.json({ message: "Resume Uploaded" });
});

export default router;
