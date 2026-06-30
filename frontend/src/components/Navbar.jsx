
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuth(!!token);
    };
    
    // run on load
    checkAuth();

    // listen to login/logout
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  // Handle smooth scroll if we are already on the home page
  const handleScrollTo = (e, targetId) => {
    setOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">
          Satish<span>.dev</span>
        </h2>

        <div
          className={`menu-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li>
            <a href="/#home" onClick={(e) => handleScrollTo(e, "home")}>Home</a>
          </li>
          <li>
            <NavLink to="/resume" onClick={() => setOpen(false)}>CV</NavLink>
          </li>
          <li>
            <a href="/#about" onClick={(e) => handleScrollTo(e, "about")}>About</a>
          </li>
          <li>
            <a href="/#skills" onClick={(e) => handleScrollTo(e, "skills")}>Skills</a>
          </li>
          <li>
            <a href="/#projects" onClick={(e) => handleScrollTo(e, "projects")}>Projects</a>
          </li>
          <li>
            <a href="/#contact" onClick={(e) => handleScrollTo(e, "contact")}>Contact</a>
          </li>

          {!isAuth ? (
            <li>
              <NavLink
                to="/admin/login"
                className="nav-btn"
                onClick={() => setOpen(false)}
              >
                Admin-Login
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className="nav-btn"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button className="nav-btn logout" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
