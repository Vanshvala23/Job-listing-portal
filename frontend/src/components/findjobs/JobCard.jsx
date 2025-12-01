// JobCard.jsx
import axios from "axios";
import { useState } from "react";

export default function JobCard({ job, onSaved }) {
  const [saving, setSaving] = useState(false);

  const saveToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login as candidate to save jobs");
      return;
    }

    setSaving(true);
    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${job._id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Saved (or unsaved) successfully");
      if (onSaved) onSaved();

    } catch (err) {
      console.error(err);
      alert("Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="fj-card">
      <div className="fj-header">
        
        {/* LOGO BOX */}
        <div className="logo">
          {job.companyLogo ? (
            <img
              src={`http://localhost:5000${job.companyLogo}`}
              alt="Company Logo"
              className="fj-logo"
            />
          ) : (
            <div className="logo-fallback">
              {job.company?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* TITLE + COMPANY */}
        <div className="titleblock">
          <h3 className="title">{job.title}</h3>
          <div className="company">{job.company}</div>
        </div>

        {/* SALARY */}
        <div className="salary-badge">
          {job.salaryMin ? `${job.salaryMin} - ${job.salaryMax}` : ""}
        </div>

      </div>

      <div className="fj-body">
        <div className="tags">
          <span className="tag">📍 {job.location || "-"}</span>
          <span className="tag">💼 {job.experience || "-"}</span>
          <span className="tag">💻 {job.workType || "-"}</span>
        </div>

        {/* DESCRIPTION */}
        <p className="desc">
          {(job.description || "").slice(0, 200)}
          {job.description?.length > 200 ? "..." : ""}
        </p>

        {/* ACTION BUTTONS */}
        <div className="fj-actions">
          <button
            className="btn-view"
            onClick={() => (window.location.href = `/jobs/${job._id}`)}
          >
            View
          </button>

          <button className="btn-save" onClick={saveToggle} disabled={saving}>
            {saving ? "..." : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
