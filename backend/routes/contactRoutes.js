import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.json({ message: "Message received", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;