import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SavedJobs.css";
import Navbar from "./Navbar";

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // number of cards per page

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/jobs/saved", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setJobs(res.data))
      .catch(console.error);
  }, []);

  const timeAgo = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Saved today";
    if (days === 1) return "Saved 1 day ago";
    return `Saved ${days} days ago`;
  };

  const removeSaved = async (jobId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(jobs.filter(j => j._id !== jobId));
    } catch (err) {
      console.error(err);
    }
  };

  // PAGINATION LOGIC
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="saved-jobs-container">
      <h2 className="saved-jobs-heading">Saved Jobs</h2>

      <div className="saved-jobs-grid">
        {currentJobs.length === 0 ? (
          <p>No saved jobs yet.</p>
        ) : (
          currentJobs.map(j => (
            <div key={j._id} className="saved-job-card">
              <h3 className="saved-job-title">{j.title}</h3>
              <p className="saved-job-company">{j.company}</p>

              <div className="saved-job-meta">
                <span>📍 {j.location}</span>
                <span>💼 {j.experience}</span>
                <span>💻 {j.workType}</span>
              </div>

              <p className="saved-job-skills">
                {j.skills?.map(s => (
                  <span key={s}>{s}</span>
                ))}
              </p>

              <p className="saved-time">{timeAgo(j.savedAt)}</p>

              <div className="button-row">
                <Link to={`/jobs/${j._id}`} className="apply-btn">
                  Apply Now
                </Link>

                <button
                  className="remove-btn"
                  onClick={() => removeSaved(j._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
    </>
  );
}
