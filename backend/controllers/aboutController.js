import About from "../models/About.js";

export const getAbout = async (req, res) => {
  const about = await About.find();
  res.json(about);
};

export const updateAbout = async (req, res) => {
  const about = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(about);
};
