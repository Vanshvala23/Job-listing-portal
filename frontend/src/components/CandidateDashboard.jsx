import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import LoadingScreen from "../components/LoadingScreen";
// import "./CandidateDashboard.css";

export default function CandidateDashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchData() {
      try {
        const userRes = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const dashRes = await axios.get("http://localhost:5000/api/candidate/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(userRes.data);
        setData(dashRes.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;
  if (!user || !data) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="dash-layout">

        {/* SIDEBAR */}
        <aside className="dash-sidebar">
          <h2 className="dash-logo">JobVerse</h2>

          <a className="side-link active">Dashboard</a>
          <a className="side-link" href="/candidate/profile">My Profile</a>
          <a className="side-link" href="/candidate/applied">Applied Jobs</a>
          <a className="side-link" href="/candidate/saved-jobs">Saved Jobs</a>
          <a className="side-link">Settings</a>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dash-main">

          {/* WELCOME BANNER */}
          <div className="welcome-banner">
            <h1>Welcome back, {user.name}! 👋</h1>
          </div>

          {/* STATS ROW */}
          <div className="stats-row">

            <div className="stat-card large">
              <h3>Profile Strength</h3>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${data.profileStrength}%` }}
                ></div>
              </div>
              <p className="stat-value">{data.profileStrength}% Completed</p>
            </div>

            <div className="stat-card">
              <h3>Applied Jobs</h3>
              <p className="stat-number">{data.appliedJobs}</p>
            </div>

            <div className="stat-card">
              <h3>Saved Jobs</h3>
              <p className="stat-number">{data.savedJobs}</p>
            </div>

          </div>

          {/* RECOMMENDED JOBS */}
          <h2 className="section-title">Recommended for You</h2>

          <div className="recommended-jobs-grid">
            {data.recommended.map((job) => (
              <div className="job-card" key={job._id}>
                
                <img
                  src={
                    job.companyLogo
                      ? `http://localhost:5000${job.companyLogo}`
                      : "/company-placeholder.png"
                  }
                  className="job-card-logo"
                />

                <div className="job-card-info">
                  <h3>{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                  <p className="job-location">📍 {job.location}</p>
                </div>

                <a href={`/jobs/${job._id}`} className="job-view-btn">
                  View Details →
                </a>
              </div>
            ))}
          </div>

        </main>

      </div>
    </>
  );
}
