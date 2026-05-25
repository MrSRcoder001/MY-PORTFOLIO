import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/manageProjects.css";
import environment from "../environment";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null); // stores the ID of project being deleted

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      setError("Failed to fetch projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    setDeleting(id);
    try {
      await API.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete project");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <section className="manage-projects-page">
      <div className="manage-header">
        <h2>Manage Projects</h2>
        <Link to="/admin/addProject" className="btn primary">
          ➕ Add New
        </Link>
      </div>

      {error && <div className="form-status error">{error}</div>}
      
      {loading ? (
        <div className="empty-state">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="empty-state">No projects found. Add one!</div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-admin-card">
              <img
                src={project.image ? `${environment.apiUrl}${project.image}` : "/placeholder.png"}
                alt={project.title}
                onError={(e) => { e.target.src = "/placeholder.png" }}
              />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description.substring(0, 80)}...</p>
              </div>
              <div className="project-actions">
                <Link to={`/admin/edit-project/${project._id}`} className="btn edit-btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="btn delete-btn"
                  disabled={deleting === project._id}
                >
                  {deleting === project._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageProjects;
