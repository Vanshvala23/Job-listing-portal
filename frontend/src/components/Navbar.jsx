import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("userRole");
    const savedName = localStorage.getItem("userName");
    const savedPhoto = localStorage.getItem("userPhoto");  // Image URL from backend

    if (token) {
      setLoggedIn(true);
      setRole(savedRole);
      setName(savedName);
      setPhoto(savedPhoto);
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const onSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value.trim();
    if (keyword) navigate(`/jobs?keyword=${encodeURIComponent(keyword)}`);
  };

  const profileImage = photo
    ? `http://localhost:5000${photo}`
    : "/avatar.png";

  return (
    <nav className="nav-container">
      <div className="nav-inner">

        {/* LOGO */}
        <Link to="/" className="nav-logo">JobVerse</Link>

        {/* SEARCH BAR */}
        <form className="nav-search" onSubmit={onSearch}>
          <input type="text" name="search" placeholder="Search jobs, companies..." />
          <button type="submit">Search</button>
        </form>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/internships">Internships</Link></li>
          <li><Link to="/compete">Competitions</Link></li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="nav-right" ref={menuRef}>
          {loggedIn && (
            <button className="icon-btn">
              <FaBell />
            </button>
          )}

          {!loggedIn ? (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/register" className="nav-btn-filled">Register</Link>
            </>
          ) : (
            <>
              {/* PROFILE IMAGE BUTTON */}
              <img
                src={profileImage}
                alt="Profile"
                className="nav-profile-img"
                onClick={() => setDropdown(!dropdown)}
              />

              {/* DROPDOWN MENU */}
              {dropdown && (
                <div className="profile-dropdown">
                  <p className="dropdown-name">{name}</p>
                  <hr />

                  {/* Dashboard for both */}
                  <Link
                    to={
                      role?.toLowerCase() === "candidate"
                        ? "/candidate/dashboard"
                        : "/employer/dashboard"
                    }
                    className="dropdown-item"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to={
                      role?.toLowerCase() === "candidate"
                        ? "/candidate/profile"
                        : "/employer/profile"
                    }
                    className="dropdown-item"
                  >
                    View Profile
                  </Link>

                  <Link to="/settings" className="dropdown-item">
                    Settings
                  </Link>

                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenu && (
        <div className="mobile-menu">
          <Link to="/jobs" onClick={() => setMobileMenu(false)}>Jobs</Link>
          <Link to="/internships" onClick={() => setMobileMenu(false)}>Internships</Link>
          <Link to="/compete" onClick={() => setMobileMenu(false)}>Competitions</Link>

          {!loggedIn && (
            <>
              <Link to="/login" onClick={() => setMobileMenu(false)}>Login</Link>
              <Link to="/register" onClick={() => setMobileMenu(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
