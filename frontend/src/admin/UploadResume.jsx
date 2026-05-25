import { useState } from "react";
import API from "../services/api";
import "../styles/adminAddProject.css";
import server from "../environment";

const UploadResume = () => {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [uploading, setUploading] = useState(false);

  const resumeURL = `${server.origin}/uploads/resume.pdf`;

  const uploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setStatus({ type: "error", message: "Please select a PDF file." });
      return;
    }

    setStatus({ type: "", message: "" });
    setUploading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await API.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatus({ type: "success", message: "Resume uploaded successfully." });
      e.target.value = "";
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-card">
        <h2>Upload Resume</h2>
        <p className="subtitle">Upload a PDF resume (it will replace the existing one).</p>

        {status.message && (
          <div className={`form-status ${status.type}`} role="status">
            {status.message}
          </div>
        )}

        <form className="admin-form">
          <div className="form-group">
            <label>Current resume</label>
            <a href={resumeURL} target="_blank" rel="noreferrer">
              View resume.pdf
            </a>
          </div>

          <div className="form-group">
            <label>Select PDF</label>
            <input type="file" accept=".pdf" onChange={uploadResume} disabled={uploading} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadResume;
