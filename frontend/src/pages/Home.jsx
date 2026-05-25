import "../styles/home.css";
import admin from "../assets/admin.png";

import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

const Home = () => {
  return (
    <main>
      <section id="home" className="home">
        <div className="home-container">

          {/* LEFT CONTENT */}
          <div className="home-left">
            <h1>
              Hi,<br />
              I'm <span>Satish</span><br />
              MERN Stack Developer
            </h1>

            <p>
              I build clean, scalable and user-friendly web applications using
              modern technologies.
            </p>

            <div className="home-buttons">
              <a href="#projects" className="btn primary">
                View Projects
              </a>
              <a href="#contact" className="btn outline">
                Contact Me
              </a>
            </div>

            {/* SOCIAL LINKS */}
            <div className="socials">
              <a
                href="https://www.linkedin.com/in/satish-rathod-84a2a1212/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                In
              </a>

              <a
                href="https://github.com/MrSRcoder001"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                Git
              </a>

              <a
                href="https://my-portfolio-2-xomq.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio"
              >
                Me
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="home-right">
            <div className="blob">
              <img src={admin} alt="Satish | MERN Stack Developer" />
            </div>
          </div>

        </div>
      </section>

      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><Contact /></div>
    </main>
  );
};

export default Home;
