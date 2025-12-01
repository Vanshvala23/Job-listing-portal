import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./JobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(console.error);
  }, [id]);

  if (!job) return <div className="loading">Loading...</div>;

  return (
    <div className="job-page">
      {/* LEFT: Job Description */}
      <div className="job-content">
        <h1 className="job-title">{job.title}</h1>
        <p className="job-company">{job.company}</p>

        <div className="meta-tags">
          <span className="tag">📍 {job.location}</span>
          <span className="tag">💼 {job.experience}</span>
          <span className="tag">💻 {job.workType}</span>
          {job.salaryMin && job.salaryMax && (
            <span className="tag">💰 ₹{job.salaryMin} - ₹{job.salaryMax}</span>
          )}
        </div>

        <div className="section">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        {job.qualifications && (
          <div className="section">
            <h2>Qualifications</h2>
            <p>{job.qualifications}</p>
          </div>
        )}

        {job.responsibilities && (
          <div className="section">
            <h2>Responsibilities</h2>
            <p>{job.responsibilities}</p>
          </div>
        )}

        {job.perks?.length > 0 && (
          <div className="section">
            <h2>Perks / Benefits</h2>
            <ul>
              {job.perks.map((perk, idx) => (
                <li key={idx}>{perk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT: Sticky Apply Box */}
      <div className="apply-box">
        <img
          src={job.companyLogo ? `http://localhost:5000${job.companyLogo}` : "/placeholder.png"}
          alt="Company Logo"
          className="apply-logo"
        />
        <h2 className="apply-job-title">{job.title}</h2>
        <p className="apply-company">{job.company}</p>

        <div className="apply-meta">
          <p>📍 {job.location}</p>
          <p>💼 {job.experience}</p>
          <p>💻 {job.workType}</p>
          {job.salaryMin && job.salaryMax && (
            <p>💰 ₹{job.salaryMin} - ₹{job.salaryMax}</p>
          )}
        </div>

        <button className="apply-btn" onClick={() => navigate(`/apply/${job._id}`)}>
          Apply Now
        </button>
      </div>
    </div>
  );
}
