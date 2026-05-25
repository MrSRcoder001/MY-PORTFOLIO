import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to fetch skills" });
  }
};

export const addSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to add skill" });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to update skill" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to delete skill" });
  }
};
