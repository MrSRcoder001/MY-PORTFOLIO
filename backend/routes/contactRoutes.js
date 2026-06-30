import express from "express";
import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";
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

    try {
      // Create transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "satishcse27@gmail.com",
        subject: `Portfolio Contact from ${resolvedName}`,
        text: `You have received a new message from your portfolio website.\n\nName: ${resolvedName}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
    } catch (mailError) {
      console.error("Failed to send email:", mailError);
      // We don't throw error to the user if saving contact succeeded, but email failed.
    }

    res.json({ message: "Message received", id: contact._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
