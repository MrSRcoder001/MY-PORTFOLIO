import aboutImg from "../assets/admin.png";
import "../styles/about.css";

const About = () => {
  return (
    <section className="about">
      {/* LEFT IMAGE */}
      <div className="about-img">
        <div className="img-bg-shape"></div>
        <img src={aboutImg} alt="About" />
      </div>

      {/* RIGHT CONTENT */}
      <div className="about-content">
        <p className="about-tag">ABOUT ME</p>

        <h2 className="about-title">
          Hello, I’m <span>Satish Rathod</span>
        </h2>

        <h4 className="about-role">Full Stack Developer</h4>

        <p className="about-desc">
          I’m a passionate Full Stack Developer with a strong focus on building
          clean, scalable, and user-friendly web applications. I enjoy solving
          real-world problems using modern technologies and writing code that is
          both efficient and maintainable.
        </p>

        <p className="about-desc">
          Currently pursuing Computer Engineering, I work with the MERN stack
          and love creating responsive, high-performance interfaces that offer
          excellent user experience.
        </p>

        <div className="about-info">
          <div>
            <p><b>Name:</b> Satish Rathod</p>
            <p><b>Age:</b> 20</p>
            <p><b>Education:</b> Computer Engineering</p>
            <p><b>Role:</b> Full Stack Developer</p>
          </div>

          <div>
            <p><b>Phone:</b> +91-899384703</p>
            <p><b>Email:</b> sr9022069@gmail.com</p>
            <p><b>Nationality:</b> Indian</p>
            <p><b>Freelance:</b> Available</p>
          </div>
        </div>

        <button className="about-btn">Get In Touch</button>
      </div>
    </section>
  );
};

export default About;
