import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./SavedApplied.css";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/candidate/applied", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setJobs(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="jobs-page">
      <h2 className="jobs-title">Applied Jobs</h2>

      <div className="jobs-grid">
        {jobs.map(app => (
          <div className="job-card" key={app._id}>
            <h3>{app.job.title}</h3>
            <p className="company">{app.job.company}</p>

            <div className="meta-row">
              <span className="badge">{app.job.location}</span>
              <span className="badge">{app.job.type}</span>
              <span className="badge green">
                Applied {new Date(app.appliedAt).toLocaleDateString()}
              </span>
            </div>

            <p className="status-label">
              Status:  
              <span
                className={
                  app.status === "Rejected"
                    ? "badge red"
                    : app.status === "Interview"
                    ? "badge green"
                    : "badge"
                }
              >
                {app.status}
              </span>
            </p>

            <a href={`/jobs/${app.job._id}`} className="job-btn">View Job</a>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
