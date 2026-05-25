import express from "express";
import { getProjects, addProject, deleteProject, updateProject } from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/projectUpload.js";

const router = express.Router();

router.get("/", getProjects);

router.post(
  "/",
  protect,
  upload.single("image"), // 👈 image field name
  addProject
);
router.delete("/:id", protect, deleteProject);
router.put("/:id", protect, upload.single("image"), updateProject);


export default router;
