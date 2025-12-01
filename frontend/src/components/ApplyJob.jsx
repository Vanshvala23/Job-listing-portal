import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./ApplyJob.css";

export default function ApplyJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(console.error);
  }, [id]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to apply");

    const fd = new FormData();
    fd.append("resume", resume);
    fd.append("coverLetter", coverLetter);
    fd.append("expectedSalary", expectedSalary);

    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${id}/apply`,
        fd,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      alert("Application Submitted Successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="job-apply-page">
      <div className="page-header">
        <Link to="/">Home</Link> &gt; 
        <Link to="/jobs"> Jobs</Link> &gt; 
        <span>{job.title}</span>
      </div>

      <div className="page-content">
        {/* LEFT: Job Details */}
        <div className="job-details">
          <h1>{job.title}</h1>
          <p>{job.company}</p>

          <div className="job-meta">
            <span>📍 {job.location}</span>
            <span>💼 {job.experience}</span>
            <span>💻 {job.workType}</span>
            {job.salaryMin && job.salaryMax && (
              <span>💰 ₹{job.salaryMin} - ₹{job.salaryMax}</span>
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

        {/* RIGHT: Application Form */}
        <div className="application-form">
          <h2>Apply for this Job</h2>

          <label>Resume</label>
          <input type="file" onChange={e => setResume(e.target.files[0])} />

          <label>Cover Letter</label>
          <textarea
            placeholder="Write your cover letter..."
            value={coverLetter}
            onChange={e => setCoverLetter(e.target.value)}
          />

          <label>Expected Salary</label>
          <input
            type="text"
            placeholder="e.g. ₹600,000 per annum"
            value={expectedSalary}
            onChange={e => setExpectedSalary(e.target.value)}
          />

          <button onClick={handleSubmit}>Submit Application</button>
        </div>
      </div>
    </div>
  );
}
