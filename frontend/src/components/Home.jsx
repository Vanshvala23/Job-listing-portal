import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaLaptopCode,
  FaBriefcase,
  FaUserTie,
  FaIndustry,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaBuilding,
  FaStar,
  FaFacebook,
  FaMicrosoft 
} from "react-icons/fa";

import {FcGoogle} from "react-icons/fc";
import {IoLogoAmazon} from "react-icons/io5";
import { SiGoldmansachs } from "react-icons/si";
import "./Home.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() || location.trim()) {
      navigate(`/jobs?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
    } else {
      alert("Please enter search term or location");
    }
  };

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
              <input
                type="text"
                placeholder="Search jobs, roles, skills…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="search-input">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button className="search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="category-section">
        <h2 className="section-title">Popular Categories</h2>
        <p className="section-desc">Explore opportunities curated for you</p>

        <div className="categories-grid">
          <div className="category-card"><FaLaptopCode className="cat-icon" /><h3>Software & IT</h3><p>45k+ Jobs</p></div>
          <div className="category-card"><FaBriefcase className="cat-icon" /><h3>Finance & Business</h3><p>22k+ Jobs</p></div>
          <div className="category-card"><FaUserTie className="cat-icon" /><h3>Sales & Marketing</h3><p>30k+ Jobs</p></div>
          <div className="category-card"><FaIndustry className="cat-icon" /><h3>Manufacturing</h3><p>10k+ Jobs</p></div>
        </div>
      </div>

      {/* TOP INTERNSHIPS / JOBS */}
      <div className="internship-section">
        <h2 className="section-title">Top Internships</h2>
        <p className="section-desc">Kickstart your career with these opportunities</p>

        <div className="internship-grid">
          <div className="internship-card"><h3>Software Development Intern</h3><p>Google</p><p>Remote</p></div>
          <div className="internship-card"><h3>Marketing Intern</h3><p>Facebook</p><p>Hybrid</p></div>
          <div className="internship-card"><h3>Finance Intern</h3><p>Amazon</p><p>Hybrid</p></div>
        </div>
      </div>

      {/* EVENTS / CHALLENGES */}
      <div className="events-section">
        <h2 className="section-title">Top Challenges & Events</h2>
        <p className="section-desc">Participate & win exciting opportunities</p>
        <div className="events-grid">
          <div className="event-card"><FaStar className="event-icon" /><h3>Hackathon 2025</h3><p>Open for all</p></div>
          <div className="event-card"><FaStar className="event-icon" /><h3>Marketing Challenge</h3><p>Top 10 winners</p></div>
          <div className="event-card"><FaStar className="event-icon" /><h3>Finance Quiz</h3><p>Prizes worth $5k</p></div>
        </div>
      </div>

      {/* WHY US */}
      <div className="why-section">
        <h2 className="section-title">Why Choose JobVerse?</h2>
        <div className="why-grid">
          <div className="why-card"><FaBolt className="why-icon" /><h3>Fast Hiring</h3><p>Quick job applications & faster employer responses.</p></div>
          <div className="why-card"><FaShieldAlt className="why-icon" /><h3>Verified Companies</h3><p>All companies & job posts are manually verified.</p></div>
          <div className="why-card"><FaUsers className="why-icon" /><h3>Smart Match</h3><p>AI-powered job recommendations tailored for you.</p></div>
        </div>
      </div>

      {/* FEATURED COMPANIES */}
      <div className="companies-section">
        <h2 className="section-title">Featured Companies</h2>
        <p className="section-desc">Work with top employers</p>
        <div className="companies-grid">
          <div className="company-card"><FcGoogle className="company-icon" /><p>Google</p></div>
          <div className="company-card"><IoLogoAmazon  className="company-icon" /><p>Amazon</p></div>
          <div className="company-card"><FaFacebook className="company-icon" /><p>Facebook</p></div>
          <div className="company-card"><FaMicrosoft className="company-icon" /><p>Microsoft</p></div>
          <div className="company-card"><SiGoldmansachs className="company-icon" /><p>Goldman Sachs</p></div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 JobVerse — Connecting talent with opportunity.</p>
      </footer>
    </div>
  );
}
