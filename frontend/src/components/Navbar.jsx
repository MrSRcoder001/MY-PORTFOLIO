import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

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

  const logoutHandler = () => {
    localStorage.removeItem("token");

    // 🔥 notify app
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
        >
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

          {!isAuth ? (
            <li>
              <Link
                to="/admin/login"
                className="nav-btn"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="nav-btn"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
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
