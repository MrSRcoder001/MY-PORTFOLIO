import { useState } from "react";
import API from "../services/api";
import "../styles/adminAddProject.css";

const AddProject = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post("/projects", project, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    alert("Project Added Successfully 🚀");
  };

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Add New Project</h2>
        <p className="subtitle">
          Fill in the details below to publish a new project.
        </p>

        <form className="admin-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              placeholder="Enter project title"
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
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="form-group">
            <label>GitHub Repository</label>
            <input
              type="url"
              placeholder="https://github.com/username/project"
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
              onChange={(e) =>
                setProject({ ...project, live: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn primary">
            Add Project
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProject;
