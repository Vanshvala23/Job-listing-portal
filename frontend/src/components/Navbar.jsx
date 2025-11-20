import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [dropdown, setDropdown] = useState(false);

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

  // Close dropdown when clicking outside
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
      <h2 className="nav-logo">JobPortal</h2>

      <ul className="nav-links">
        <li>Jobs</li>
        <li>Companies</li>
        <li>Services</li>
        <li>Notifications</li>
      </ul>

      <div className="nav-right" ref={menuRef}>
        {!loggedIn ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn-filled">Register</Link>
          </>
        ) : (
          <>
            <div
              className="profile-avatar"
              onClick={() => setDropdown(!dropdown)}
            >
              <FaUserCircle size={32} />
            </div>

            {dropdown && (
              <div className="profile-dropdown">
                <p className="dropdown-name">{name}</p>
                <hr />

                <Link
                  to={role?.toLowerCase() === "candidate" ? "/candidate/dashboard" : "/employer/dashboard"}
                  className="dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  Dashboard
                </Link>

                <Link
                  to={role?.toLowerCase() === "candidate" ? "/candidate/profile" : "/employer/profile"}
                  className="dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  View Profile
                </Link>

                <Link
                  to="/settings"
                  className="dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  Settings
                </Link>

                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
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
    </nav>
  );
}
