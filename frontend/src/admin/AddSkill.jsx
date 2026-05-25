import { useState } from "react";
import API from "../services/api";
import "../styles/adminAddProject.css";

const AddSkill = () => {
  const [skill, setSkill] = useState({
    name: "",
    level: "Beginner",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/skills", skill, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Skill Added Successfully 🚀");
      setSkill({ name: "", level: "Beginner" });
    } catch (error) {
      alert("Error adding skill: " + error.message);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Add New Skill</h2>
        <p className="subtitle">
          Add a new skill to your portfolio.
        </p>

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
              value={skill.level}
              onChange={(e) =>
                setSkill({ ...skill, level: e.target.value })
              }
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(148, 163, 184, 0.4)",
                padding: "10px 4px",
                fontSize: "14px",
                color: "var(--text)",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <button type="submit" className="btn primary">
            Add Skill
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddSkill;
