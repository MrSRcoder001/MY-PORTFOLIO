import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRouters.js";
import contactRoutes from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API running" });
});

app.get("/api", (req, res) => {
  res.json({ message: "API endpoints available" });
});

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/about", aboutRoutes);

app.use("/uploads", express.static("uploads"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.path });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API base URL: http://localhost:${PORT}/api`);
      console.log(`✅ Available endpoints:`);
      console.log(`   GET  /api`);
      console.log(`   POST /api/admin/login`);
      console.log(`   GET  /api/projects`);
      console.log(`   GET  /api/skills`);
      console.log(`   POST /api/contact`);
      console.log(`   GET  /api/about`);
      console.log(`   POST /api/resume/upload`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
