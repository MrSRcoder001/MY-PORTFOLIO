import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/projects.css";
import images from "../assets/evStation.jpg"

const defaultProjects = new Array(3).fill(null);

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  const displayProjects = projects.length ? projects : defaultProjects;

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

        <div className="projects-grid">
          {displayProjects.map((p, index) => (
            <div
              className={`project-card ${!p ? "skeleton" : ""}`}
              key={p?._id || index}
            >

              <div className="project-image">
                {p ? (
                  <img
                    src={images}
                    alt={p.title}
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
                      <a href={p.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                      {p.live && (
                        <a href={p.live} className="live">
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
