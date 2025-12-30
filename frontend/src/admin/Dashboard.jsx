import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/adminDashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projectsRes = await API.get("/projects");
        const skillsRes = await API.get("/skills");

        setStats({
          projects: projectsRes.data.length,
          skills: skillsRes.data.length,
        });
      } catch (error) {
        console.error("Dashboard stats error", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="dashboard">

      {/* HEADER */}
      <div className="dash-header">
        <h1>{getGreeting()}, Satish 👋</h1>
        <p>Admin control panel for your portfolio</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Projects</h3>
          <span>{stats.projects}</span>
          <p>Total Live Projects</p>
        </div>

        <div className="stat-card">
          <h3>Skills</h3>
          <span>{stats.skills}</span>
          <p>Technologies Listed</p>
        </div>

        <div className="stat-card">
          <h3>Experience</h3>
          <span>1.5+</span>
          <p>Years of Learning</p>
        </div>

        <div className="stat-card highlight">
          <h3>Status</h3>
          <span>Open</span>
          <p>For Hiring</p>
        </div>
      </div>

      {/* ADMIN ACTIONS */}
      <div className="admin-actions">
        <a href="/admin/addProject">➕ Add Project</a>
        <a href="/admin/add-skill">➕ Add Skill</a>
        <a href="/admin/upload-resume">📄 Upload Resume</a>
      </div>

      {/* CTA */}
      <div className="cta-card">
        <div>
          <h2>Build. Learn. Improve.</h2>
          <p>
            Manage your portfolio content, keep projects updated,
            and stay job-ready.
          </p>
        </div>
        <a href="/projects">View Public Portfolio</a>
      </div>

    </section>
  );
};

export default Dashboard;
