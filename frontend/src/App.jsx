import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadResume from "./admin/UploadResume";
import Dashboard from "./admin/Dashboard";
import Resume from "./pages/Resume"
import AddProject from "./admin/AddProject";
import AdminLogin from "./admin/AdminLogin";
import PrivateRoute from "./admin/PrivateRoute";
import AddSkill from "./admin/AddSkill";
import ManageProjects from "./admin/ManageProjects";
import EditProject from "./admin/EditProject";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/upload-resume"
          element={
            <PrivateRoute>
              <UploadResume />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-skill"
          element={
            <PrivateRoute>
              <AddSkill />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/addProject"
          element={
            <PrivateRoute>
              <AddProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-projects"
          element={
            <PrivateRoute>
              <ManageProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-project/:id"
          element={
            <PrivateRoute>
              <EditProject />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
