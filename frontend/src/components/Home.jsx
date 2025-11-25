import Navbar from "./Navbar";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaLaptopCode,
  FaBriefcase,
  FaUserTie,
  FaIndustry,
  FaShieldAlt,
  FaBolt,
  FaUsers
} from "react-icons/fa";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="floating-circle circle1"></div>
        <div className="floating-circle circle2"></div>
        <div className="floating-circle circle3"></div>

        <div className="hero-content">
          <h1>
            Discover <span>Your Next Big Opportunity</span>
          </h1>
          <p className="hero-subtitle">
            Explore internships, jobs & top hiring challenges from leading companies.
          </p>

          {/* Search Bar */}
          <div className="search-box">
            <div className="search-input">
              <FaSearch className="icon" />
              <input type="text" placeholder="Search jobs, roles, skills…" />
            </div>

            <div className="search-input">
              <FaMapMarkerAlt className="icon" />
              <input type="text" placeholder="Location" />
            </div>

            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="category-section">
        <h2 className="section-title">Popular Categories</h2>
        <p className="section-desc">Explore opportunities curated for you</p>

        <div className="categories-grid">
          <div className="category-card">
            <FaLaptopCode className="cat-icon" />
            <h3>Software & IT</h3>
            <p>45k+ Jobs</p>
          </div>

          <div className="category-card">
            <FaBriefcase className="cat-icon" />
            <h3>Finance & Business</h3>
            <p>22k+ Jobs</p>
          </div>

          <div className="category-card">
            <FaUserTie className="cat-icon" />
            <h3>Sales & Marketing</h3>
            <p>30k+ Jobs</p>
          </div>

          <div className="category-card">
            <FaIndustry className="cat-icon" />
            <h3>Manufacturing</h3>
            <p>10k+ Jobs</p>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="why-section">
        <h2 className="section-title">Why Choose JobVerse?</h2>

        <div className="why-grid">
          <div className="why-card">
            <FaBolt className="why-icon" />
            <h3>Fast Hiring</h3>
            <p>Quick job applications & faster employer responses.</p>
          </div>

          <div className="why-card">
            <FaShieldAlt className="why-icon" />
            <h3>Verified Companies</h3>
            <p>All companies & job posts are manually verified.</p>
          </div>

          <div className="why-card">
            <FaUsers className="why-icon" />
            <h3>Smart Match</h3>
            <p>AI-powered job recommendations tailored for you.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 JobVerse — Connecting talent with opportunity.</p>
      </footer>
    </div>
  );
}
