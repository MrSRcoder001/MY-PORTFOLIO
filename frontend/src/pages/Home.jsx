import "../styles/home.css";
import admin from "../assets/admin.png"
const Home = () => {
  return (
    <section className="home">
      <div className="home-container">

        {/* LEFT CONTENT */}
        <div className="home-left">
          <h1>
            Hi,<br />
            I’m <span>Satish</span><br />
            MERN Stack Developer
          </h1>

          <p>
            I build clean, scalable and user-friendly web applications using
            modern technologies.
          </p>

          <div className="home-buttons">
            <a href="/projects" className="btn primary">View Projects</a>
            <a href="/contact" className="btn outline">Contact Me</a>
          </div>

          <div className="socials">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="GitHub">gh</a>
            <a href="#" aria-label="Portfolio">be</a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="home-right">
          <div className="blob">
            <img
              src={admin}
              alt="Developer"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home;
