import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: String,
  level: String // Beginner / Intermediate / Advanced
});

export default mongoose.model("Skill", skillSchema);
