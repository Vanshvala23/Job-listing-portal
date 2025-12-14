import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SavedJobs.css";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchSaved = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/jobs/saved", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter: remove null, undefined, ObjectId strings, invalid objects
      const validJobs = res.data.filter(
        (item) => item.job && typeof item.job === "object"
      );

      setSavedJobs(validJobs);
    } catch (err) {
      console.error("Saved jobs fetch error:", err);
    }
    setLoading(false);
  };

  fetchSaved();
}, []);


  if (loading) return <div className="saved-loading">Loading saved jobs...</div>;

  return (
  <div className="saved-wrapper">
    <h1 className="saved-heading">Saved Jobs</h1>

    {savedJobs.length === 0 && (
      <p className="saved-empty">You haven’t saved any jobs yet.</p>
    )}

    <div className="saved-grid">
      {savedJobs.map(({ job, _id }) =>
        job ? (
          <div key={_id} className="saved-card-modern">
            <div className="saved-top">
              <img
                src={
                  job.companyLogo
                    ? `http://localhost:5000/uploads/logos/${job.companyLogo}`
                    : "/default-logo.png"
                }
                alt="Logo"
                className="saved-modern-logo"
              />

              <div className="saved-info">
                <h3 className="saved-job">{job.title}</h3>
                <p className="saved-companyname">{job.company}</p>
                <span className="saved-location-tag">
                  📍 {job.location || "Not specified"}
                </span>
              </div>
            </div>

            <div className="saved-bottom">
              <Link to={`/jobs/${job._id}`} className="saved-btn view">
                View Details
              </Link>

              <Link to={`/apply/${job._id}`} className="saved-btn apply">
                Apply
              </Link>
            </div>
          </div>
        ) : null
      )}
    </div>
  </div>
);

}
