import { useState } from "react";
import API from "../services/api";
import "../styles/adminAddProject.css";

const AddSkill = () => {
  const [skill, setSkill] = useState({
    name: "",
    level: "Beginner",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setStatus({ type: "", message: "" });
      setSubmitting(true);
      await API.post("/skills", skill, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStatus({ type: "success", message: "Skill added successfully." });
      setSkill({ name: "", level: "Beginner" });
    } catch (error) {
      console.error("Error adding skill:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Add New Skill</h2>
        <p className="subtitle">
          Add a new skill to your portfolio.
        </p>

        {status.message && (
          <div className={`form-status ${status.type}`} role="status">
            {status.message}
          </div>
        )}

        <form className="admin-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label>Skill Name</label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, Python"
              value={skill.name}
              onChange={(e) =>
                setSkill({ ...skill, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Proficiency Level</label>
            <select
              className="admin-select"
              value={skill.level}
              onChange={(e) =>
                setSkill({ ...skill, level: e.target.value })
              }
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <button type="submit" className="btn primary" disabled={submitting}>
            {submitting ? "Adding..." : "Add Skill"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddSkill;
