import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstName = "", lastName = "", name = "", email = "", message = "" } =
      req.body || {};

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({ message: "Message is too short" });
    }

    const resolvedName =
      String(name).trim() ||
      `${String(firstName).trim()} ${String(lastName).trim()}`.trim() ||
      "Anonymous";

    const contact = await Contact.create({
      firstName,
      lastName,
      name: resolvedName,
      email,
      message,
    });

    res.json({ message: "Message received", id: contact._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
