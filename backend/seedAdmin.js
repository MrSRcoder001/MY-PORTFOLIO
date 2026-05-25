import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await Admin.findOne({ email: "admin@example.com" });
    if (!existing) {
      const hashed = await bcrypt.hash("satishcse27", 10);
      await Admin.create({ email: "admin@example.com", password: hashed });
      console.log("Admin user seeded: admin@example.com / satishcse27");
    } else {
      console.log("Admin user already exists");
    }
    
    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
