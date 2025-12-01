import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileAccount, setMobileAccount] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");

    if (token) {
      setLoggedIn(true);
      setRole(role);
      setName(name);
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-logo">
        JobVerse
      </Link>

      {/* MOBILE MENU BUTTON */}
      <div className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* DESKTOP LINKS */}
      <ul className="nav-links">
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/internships">Internships</Link></li>
        <li>Companies</li>
        <li>Services</li>
        <li>Notifications</li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-right" ref={menuRef}>
        {!loggedIn ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn-filled">Register</Link>
          </>
        ) : (
          <>
            <div className="profile-avatar" onClick={() => setDropdown(!dropdown)}>
              <FaUserCircle size={32} />
            </div>

            {dropdown && (
              <div className="profile-dropdown">
                <p className="dropdown-name">{name}</p>
                <hr />

                <Link
                  to={role?.toLowerCase() === "candidate"
                    ? "/candidate/dashboard"
                    : "/employer/dashboard"}
                  className="dropdown-item"
                >
                  Dashboard
                </Link>

                {role?.toLowerCase() === "candidate" && (
                  <Link
                    to="/candidate/saved"
                    className="dropdown-item"
                  >
                    Saved Jobs
                  </Link>
                )}

                <Link
                  to={role?.toLowerCase() === "candidate"
                    ? "/candidate/profile"
                    : "/employer/profile"}
                  className="dropdown-item"
                >
                  View Profile
                </Link>

                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>

                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                    window.location.href = "/";
                  }}
                  className="dropdown-item logout"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenu && (
        <div className="mobile-menu">
          <Link to="/jobs" onClick={() => setMobileMenu(false)}>Jobs</Link>
          <Link onClick={() => setMobileMenu(false)}>Companies</Link>
          <Link onClick={() => setMobileMenu(false)}>Services</Link>
          <Link onClick={() => setMobileMenu(false)}>Notifications</Link>

          {!loggedIn ? (
            <>
              <Link className="mobile-btn" to="/login">Login</Link>
              <Link className="mobile-btn-filled" to="/register">Register</Link>
            </>
          ) : (
            <>
              <div className="mobile-profile-header" onClick={() => setMobileAccount(!mobileAccount)}>
                <FaUserCircle size={24} /> {name}
              </div>

              {mobileAccount && (
                <div className="mobile-profile-menu">
                  <Link
                    to={role?.toLowerCase() === "candidate"
                      ? "/candidate/dashboard"
                      : "/employer/dashboard"}
                  >
                    Dashboard
                  </Link>

                  {role?.toLowerCase() === "candidate" && (
                    <Link to="/candidate/saved">Saved Jobs</Link>
                  )}

                  <Link
                    to={role?.toLowerCase() === "candidate"
                      ? "/candidate/profile"
                      : "/employer/profile"}
                  >
                    View Profile
                  </Link>

                  <Link to="/settings">Settings</Link>

                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
