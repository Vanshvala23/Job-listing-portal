// frontend/src/components/JobDetails.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./JobDetails.css";
export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [cover, setCover] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${id}`).then(res => setJob(res.data)).catch(console.error);
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login"); return; }
    const fd = new FormData();
    fd.append("coverLetter", cover);
    fd.append("expectedSalary", expectedSalary);
    if (resume) fd.append("resume", resume);

    try {
      const res = await axios.post(`http://localhost:5000/api/jobs/${id}/apply`, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert(res.data.message || "Applied");
    } catch (err) { console.error(err); alert(err.response?.data?.message || "Error") }
  };

  if (!job) return <div className="dashboard"><h2>Loading...</h2></div>;
  return (
    <div className="job-details-container">

    <h1 className="job-details-title">{job.title}</h1>

    <div className="job-details-meta">
      <span className="job-tag">{job.company}</span>
      <span className="job-tag">📍 {job.location}</span>
      <span className="job-tag">💼 {job.experience}</span>
      <span className="job-tag">💻 {job.workType}</span>
    </div>

    <div className="job-description">{job.description}</div>

    <div className="apply-box">
      <h3>Apply for this job</h3>

      <input type="file" onChange={e => setResume(e.target.files[0])} />

      {/* <textarea placeholder="Cover letter" className="cover-letter"
        value={cover}
        onChange={e => setCover(e.target.value)}
      ></textarea> */}
      <textarea 
  placeholder="Cover letter"
  className="cover-letter"
  value={cover}
  onChange={e => setCover(e.target.value)}
></textarea>


      <input
        placeholder="Expected salary"
        value={expectedSalary}
        onChange={e => setExpectedSalary(e.target.value)}
      />

      <button className="apply-btn" onClick={handleApply}>
        Submit Application
      </button>
    </div>
  </div>
  );
}
