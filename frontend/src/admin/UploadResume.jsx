import API from "../services/api";
import "../styles/admin.css";

const UploadResume = () => {

  // 👇 PASTE YOUR FUNCTION HERE
  const uploadResume = async (e) => {
    const formData = new FormData();
    formData.append("resume", e.target.files[0]);

    await API.post("/resume/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Resume Uploaded Successfully");
  };

  return (
    <div className="admin-form">
      <h2>Upload Resume (PDF)</h2>

      {/* 👇 FUNCTION USED HERE */}
      <input
        type="file"
        accept=".pdf"
        onChange={uploadResume}
      />
    </div>
  );
};

export default UploadResume;
