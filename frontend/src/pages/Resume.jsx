const Resume = () => {
  const resumeURL = `http://localhost:5000/uploads/resume.pdf?v=${Date.now()}`;

  return (
    <section className="resume-section">
      <div className="resume-card">
        <h2 className="resume-title">My Resume</h2>
        <p className="resume-subtitle">
          Download or view my professional resume
        </p>

        <div className="resume-actions">
          <a href={resumeURL} target="_blank" className="btn primary">
            View Resume
          </a>

          <a href={resumeURL} download className="btn outline">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
