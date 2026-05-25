import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/adminDashboard.css";
 import { Link } from "react-router-dom";

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
        const [projectsRes, skillsRes] = await Promise.allSettled([
          API.get("/projects"),
          API.get("/skills"),
        ]);

        const projectsCount =
          projectsRes.status === "fulfilled" ? projectsRes.value.data.length : 0;
        const skillsCount =
          skillsRes.status === "fulfilled" ? skillsRes.value.data.length : 0;

        setStats({
          projects: projectsCount,
          skills: skillsCount,
        });
      } catch (error) {
        console.error("Dashboard stats error", error);
        setStats({ projects: 0, skills: 0 });
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
  <Link to="/admin/manage-projects">📝 Manage Projects</Link>
  <Link to="/admin/addProject">➕ Add Project</Link>
  <Link to="/admin/add-skill">➕ Add Skill</Link>
  <Link to="/admin/upload-resume">📄 Upload Resume</Link>
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
