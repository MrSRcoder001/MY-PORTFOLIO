import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to fetch projects" });
  }
};

export const addProject = async (req, res) => {
  try {
    const tech =
      Array.isArray(req.body.tech)
        ? req.body.tech
        : (req.body.tech || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

    const imagePath = req.file ? `/uploads/projects/${req.file.filename}` : "";

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      tech, // comma separated or array
      github: req.body.github,
      live: req.body.live,
      image: imagePath,
      images: imagePath, // legacy
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to delete project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let tech = project.tech;
    if (req.body.tech !== undefined) {
      tech = Array.isArray(req.body.tech)
        ? req.body.tech
        : (req.body.tech || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
    }

    const updatedData = {
      title: req.body.title || project.title,
      description: req.body.description || project.description,
      tech,
      github: req.body.github || project.github,
      live: req.body.live || project.live,
    };

    if (req.file) {
      const imagePath = `/uploads/projects/${req.file.filename}`;
      updatedData.image = imagePath;
      updatedData.images = imagePath; // legacy
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Failed to update project" });
  }
};
