import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Internships.css";
import heroImg from "../images/internship-hero.jpg"; // you can use a hero image for internships

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const fetchInternships = async (p = 1) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/internships?page=${p}&limit=${limit}`);
      setInternships(res.data.internships);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInternships(1);
  }, []);

  const goPage = (p) => {
    if (p >= 1 && p <= totalPages) fetchInternships(p);
  };

  const generateColors = (company) => {
    if (!company) return ["#6a11cb", "#2575fc"];
    let hash = 0;
    for (let i = 0; i < company.length; i++) hash = company.charCodeAt(i) + ((hash << 5) - hash);
    const h1 = Math.abs(hash % 360),
      h2 = (h1 + 60) % 360;
    return [`hsl(${h1},82%,62%)`, `hsl(${h2},82%,52%)`];
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="intern-hero-section">
        <div className="intern-hero-content">
          <div className="hero-text">
            <h1>Explore <span>Internship Opportunities</span></h1>
            <p>Find the best internships to kickstart your career and gain real-world experience.</p>
          </div>
          <div className="hero-img">
            <img src={heroImg} alt="Internship Hero" />
          </div>
        </div>
      </section>

      {/* INTERNSHIP LIST */}
      <section className="internship-list-section">
        <h2>Latest Internships</h2>
        <div className="internship-grid">
          {internships.map((intern) => (
            <div key={intern._id} className="internship-card">
              <div
                className="internship-banner"
                style={{
                  background: `linear-gradient(135deg,${generateColors(intern.company)[0]},${generateColors(intern.company)[1]})`,
                }}
              >
                <span className="internship-tag">{intern.workType || "Remote"}</span>
                <div className="internship-logo-box">
                  {intern.companyLogo ? <img src={`http://localhost:5000${intern.companyLogo}`} alt="logo" /> : intern.company?.charAt(0)}
                </div>
              </div>
              <div className="internship-body">
                <h3>{intern.title}</h3>
                <p className="internship-company">{intern.company}</p>
                <div className="internship-meta">
                  <span>📍 {intern.location}</span>
                  <span>🕒 {intern.duration || "3 Months"}</span>
                </div>
                <button className="apply-btn" onClick={() => window.location.href = `/internships/${intern._id}`}>
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button onClick={() => goPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => goPage(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </section>
    </>
  );
}
