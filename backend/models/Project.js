import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },

  // Preferred field used by the frontend.
  image: { type: String, default: "" },

  // Legacy field kept for backward compatibility with existing DB data.
  images: { type: String, default: "" },

  tech: [{ type: String, trim: true }],
  github: { type: String, trim: true, default: "" },
  live: { type: String, trim: true, default: "" },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
