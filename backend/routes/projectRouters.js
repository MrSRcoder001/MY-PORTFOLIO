import express from "express";
import { getProjects, addProject, deleteProject } from "../controllers/projectController.js";
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
// Add update route
// router.put("/:id", protect, updateProject);


export default router;
