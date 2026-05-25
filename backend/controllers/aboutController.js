import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to fetch about" });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to update about" });
  }
};
