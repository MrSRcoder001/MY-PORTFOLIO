import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, default: "" },
  lastName: { type: String, trim: true, default: "" },
  name: { type: String, trim: true, default: "" },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
