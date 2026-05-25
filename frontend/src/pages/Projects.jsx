import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/projects.css";
import server from "../environment";

const defaultProjects = new Array(3).fill(null);

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        if (!isActive) return;
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        if (!isActive) return;
        setLoadError("Couldn't load projects right now.");
        setProjects([]);
      }
    };

    fetchProjects();

    return () => {
      isActive = false;
    };
  }, []);

  const isLoading = projects === null;
  const hasProjects = Array.isArray(projects) && projects.length > 0;
  const displayProjects = isLoading ? defaultProjects : (projects || []);

  return (
    <section className="projects-section">
      <div className="projects-container">

        <div className="projects-header">
          <h2>My Work</h2>
          <p>
            A collection of projects showcasing my skills in MERN stack
            development and modern UI design.
          </p>
        </div>

        {!isLoading && !hasProjects && (
          <div className="projects-empty" role="status">
            {loadError || "No projects added yet."}
          </div>
        )}

        <div className="projects-grid">
          {displayProjects.map((p, index) => (
            <div
              className={`project-card ${!p ? "skeleton" : ""}`}
              key={p?._id || index}
            >

              <div className="project-image">
                {p ? (
                  <img
                    src={(() => {
                      const raw = p.image || p.images;
                      if (!raw) return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="190"%3E%3Crect fill="%23020617" width="280" height="190"/%3E%3C/svg%3E`;
                      return raw.startsWith("/") ? `${server.origin}${raw}` : raw;
                    })()}
                    alt={p.title}
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="190"%3E%3Crect fill="%23020617" width="280" height="190"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%2394a3b8"%3E${p.title}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                ) : (
                  <div className="skeleton-img"></div>
                )}
              </div>

              <div className="project-content">
                {p ? (
                  <>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>

                    <div className="project-links">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="live">
                          Live
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="skeleton-text title"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text short"></div>
                    <div className="skeleton-btns">
                      <span></span>
                      <span></span>
                    </div>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
