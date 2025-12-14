import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { FaBookmark, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./SavedApplied.css";

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/candidate/saved", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setJobs(res.data));
  }, []);

  const removeSaved = async (jobId) => {
    await axios.delete(`http://localhost:5000/api/jobs/${jobId}/save`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setJobs(jobs.filter(j => j.job._id !== jobId));
  };

  return (
    <>
      <Navbar />
      <div className="saved-wrapper">
        <h2 className="saved-heading">Saved Jobs</h2>
        <p className="saved-subheading">
          Jobs you saved for later. Apply before applications close.
        </p>

        <div className="saved-grid">
          {jobs.length === 0 && (
            <p className="empty-msg">No saved jobs yet.</p>
          )}

          {jobs.map(j => (
            <div className="saved-card" key={j._id}>
              
              {/* Header with logo */}
              <div className="card-top">
                <img
                  src={
                    j.job.companyLogo
                      ? `http://localhost:5000/${j.job.companyLogo.replace(/^\/+/, "")}`
                      : "/default-logo.png"
                  }
                  alt={j.job.company}
                  className="company-logo"
                />
                <div className="job-info">
                  <h3 className="job-title">{j.job.title}</h3>
                  <p className="company-name">{j.job.company}</p>
                </div>
                <FaBookmark 
                  className="unsave-icon" 
                  onClick={() => removeSaved(j.job._id)}
                />
              </div>

              {/* Meta Info */}
              <div className="job-meta">
                <span><FaMapMarkerAlt /> {j.job.location || "Not specified"}</span>
                <span><FaClock /> Saved: {new Date(j.savedAt).toLocaleDateString()}</span>
              </div>

              {/* Skills */}
              <div className="skills-row">
                {j.job.skills?.slice(0, 4).map((s, idx) => (
                  <span className="skill-tag" key={idx}>{s}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="card-footer">
                <a href={`/jobs/${j.job._id}`} className="apply-btn">
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
