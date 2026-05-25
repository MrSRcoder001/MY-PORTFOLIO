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
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/about", aboutRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
