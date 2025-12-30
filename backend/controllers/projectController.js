import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const addProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      tech: req.body.tech?.split(","), // comma separated
      github: req.body.github,
      live: req.body.live,
      image: req.file ? `/uploads/projects/${req.file.filename}` : "",
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project Deleted" });
};
