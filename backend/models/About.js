import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  description: String,
  experience: String,
  education: String,
});

export default mongoose.model("About", aboutSchema);
