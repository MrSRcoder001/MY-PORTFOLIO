import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">Satish<span>.dev</span></h2>

        <div className={`menu-toggle ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/resume" onClick={() => setOpen(false)}>CV</Link></li>

          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link to="/skills" onClick={() => setOpen(false)}>Skills</Link></li>
          <li><Link to="/projects" onClick={() => setOpen(false)}>Projects</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
