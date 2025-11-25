import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import ManageJobs from "./ManageJobs";
import ApplicantList from "./ApplicantList";
import "./EmployerDashboard.css";

export default function EmployerDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] = useState("dashboard");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, profileRes, jobRes, applicantRes] = await Promise.all([
          axios.get("http://localhost:5000/api/auth/me", { headers }),
          axios.get("http://localhost:5000/api/employer/me", { headers }),
          axios.get("http://localhost:5000/api/employer/jobs", { headers }),
          axios.get("http://localhost:5000/api/employer/applicants", { headers }),
        ]);

        setUser(userRes.data);
        setProfile(profileRes.data);
        setJobs(jobRes.data);
        setApplicants(applicantRes.data);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="dash-layout">
      {/* SIDEBAR */}
      <div className="dash-sidebar">
        <h2 className="dash-logo">JobVerse</h2>

        <button
          className={`side-link ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>

        <a href="/create-job" className="side-link">Post Job</a>
        <button
          className={`side-link ${activePage === "manage" ? "active" : ""}`}
          onClick={() => setActivePage("manage")}
        >
          Manage Jobs
        </button>

        <button
          className={`side-link ${activePage === "applicants" ? "active" : ""}`}
          onClick={() => setActivePage("applicants")}
        >
          Applicants
        </button>


        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="dash-main">
        {activePage === "dashboard" && (
          <>
            <h1>Welcome, {profile?.companyName || "Employer"}</h1>
            <p className="dash-welcome">Manage your company recruiting activity</p>

            <div className="stats-row">
              <div className="stat-card">
                <h3>Active Job Posts</h3>
                <p className="stat-number">{jobs.length}</p>
              </div>

              <div className="stat-card">
                <h3>Total Applicants</h3>
                <p className="stat-number">{applicants.length}</p>
              </div>

              <div className="stat-card">
                <h3>Interviews Scheduled</h3>
                <p className="stat-number">
                  {applicants.filter((a) => a.status === "Interview").length}
                </p>
              </div>
            </div>

            <h2 className="section-title">Recent Applicants</h2>
            <div className="job-list">
              {applicants.length === 0 ? (
                <p>No applicants yet.</p>
              ) : (
                applicants.slice(0, 5).map((a) => (
                  <div key={a._id} className="job-card">
                    <h3>{a.userName} — {a.jobTitle}</h3>
                    <p>Applied {a.appliedAgo}</p>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activePage === "manage" && (
          <ManageJobs jobs={jobs} setJobs={setJobs} />
        )}

        {activePage === "applicants" && (
          <ApplicantList applicants={applicants} setApplicants={setApplicants} />
        )}
      </div>
    </div>
  );
}
