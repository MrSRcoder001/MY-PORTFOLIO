import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/adminAddProject.css"; // Reuse AddProject styles

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    imageFile: null,
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const { data } = await API.get("/projects");
        const found = data.find((p) => p._id === id);
        if (found) {
          setProject({
            title: found.title || "",
            description: found.description || "",
            tech: Array.isArray(found.tech) ? found.tech.join(", ") : found.tech || "",
            github: found.github || "",
            live: found.live || "",
            imageFile: null,
          });
        } else {
          setStatus({ type: "error", message: "Project not found." });
        }
      } catch (err) {
        setStatus({ type: "error", message: "Error fetching project details." });
      } finally {
        setFetching(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("description", project.description);
      formData.append("tech", project.tech);
      formData.append("github", project.github);
      formData.append("live", project.live);
      if (project.imageFile) formData.append("image", project.imageFile);

      await API.put(`/projects/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setStatus({ type: "success", message: "Project updated successfully." });
      setTimeout(() => navigate("/admin/manage-projects"), 1500);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Error updating project. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) {
    return <section className="admin-page"><div className="admin-card"><h2>Loading...</h2></div></section>;
  }

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Edit Project</h2>
        <p className="subtitle">
          Update the details of your project.
        </p>

        {status.message && (
          <div className={`form-status ${status.type}`} role="status">
            {status.message}
          </div>
        )}

        <form className="admin-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              placeholder="Enter project title"
              value={project.title}
              required
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Short project description"
              rows="4"
              value={project.description}
              required
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tech Stack (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, MongoDB"
              value={project.tech}
              onChange={(e) => setProject({ ...project, tech: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>GitHub Repository</label>
            <input
              type="url"
              placeholder="https://github.com/username/project"
              value={project.github}
              onChange={(e) =>
                setProject({ ...project, github: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Live Project URL</label>
            <input
              type="url"
              placeholder="https://yourproject.live"
              value={project.live}
              onChange={(e) =>
                setProject({ ...project, live: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Update Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProject({
                  ...project,
                  imageFile: e.target.files?.[0] || null,
                })
              }
            />
            <small>Leave empty to keep the current image.</small>
          </div>

          <button type="submit" className="btn primary" disabled={submitting}>
            {submitting ? "Updating..." : "Update Project"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProject;
