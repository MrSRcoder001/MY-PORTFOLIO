import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import UploadResume from "./admin/UploadResume";
import Dashboard from "./admin/Dashboard";
import Resume from "./pages/Resume"
import AddProject from "./admin/AddProject";
import AdminLogin from "./admin/AdminLogin";
import PrivateRoute from "./admin/PrivateRoute";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>


        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/upload-resume"
          element={
            <PrivateRoute>
              <UploadResume />
            </PrivateRoute>
          }
        />

        <Route path="/admin/upload-resume" element={<UploadResume />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/admin/addProject" element={<AddProject />} />
        <Route path="/adminLogin" element={<AdminLogin />} />





      </Routes>
    </BrowserRouter>
  );
}

export default App;
