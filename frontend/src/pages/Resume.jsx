import "../styles/resume.css";
import server from "../environment";

const Resume = () => {
  const resumeURL = `${server.origin}/uploads/resume.pdf`;

  return (
    <section className="resume-section">
      <div className="resume-card">
        <h2 className="resume-title">My Resume</h2>
        <p className="resume-subtitle">
          Download or view my professional resume
        </p>

        <div className="resume-actions">
          <a
            href={resumeURL}
            target="_blank"
            rel="noreferrer"
            className="btn primary"
          >
            View Resume
          </a>

          <a href={resumeURL} download="Satish-Rathod-Resume.pdf" className="btn outline">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
