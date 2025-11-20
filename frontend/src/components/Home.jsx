import Navbar from "./Navbar";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaLaptopCode,
  FaBriefcase,
  FaUserTie,
  FaIndustry
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Find Your <span>Dream Job</span> Faster
          </h1>
          <p>Discover 500,000+ jobs across top companies hiring today</p>

          {/* Search Bar */}
          <div className="search-box">
            <div className="search-input">
              <FaSearch className="icon" />
              <input type="text" placeholder="Job title, skills…" />
            </div>

            <div className="search-input">
              <FaMapMarkerAlt className="icon" />
              <input type="text" placeholder="Location" />
            </div>

            <button className="search-btn">Search Jobs</button>
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="category-section">
        <h2>Popular Job Categories</h2>
        <p>Choose a category and start browsing jobs</p>

        <div className="categories">
          <div className="category-card">
            <FaLaptopCode className="cat-icon" />
            <h3>IT & Software</h3>
            <p>45k+ Jobs</p>
          </div>

          <div className="category-card">
            <FaBriefcase className="cat-icon" />
            <h3>Business & Finance</h3>
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

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 JobPortal — All Rights Reserved</p>
      </footer>
    </div>
  );
}
