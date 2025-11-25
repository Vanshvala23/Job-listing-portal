import { useState } from "react";
import axios from "axios";
import "./CreateJob.css";
import Navbar from "./Navbar";

export default function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    experience: "",
    workType: "",
    skills: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const createJob = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login as Employer first.");

    try {
      await axios.post("http://localhost:5000/api/jobs/create", {
        ...job,
        skills: job.skills.split(",").map(s => s.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Job Posted Successfully!");
      setJob({
        title: "",
        company: "",
        location: "",
        category: "",
        experience: "",
        workType: "",
        skills: "",
        description: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error posting job");
    }
  };

  return (
    <><Navbar />
    <div className="create-job-container">
      <h2>Post a New Job</h2>

      <input name="title" placeholder="Job Title" value={job.title} onChange={handleChange} />
      <input name="company" placeholder="Company Name" value={job.company} onChange={handleChange} />
      <input name="location" placeholder="Location" value={job.location} onChange={handleChange} />

      <select name="category" value={job.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Software">Software</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Design">Design</option>
        <option value="Sales">Sales</option>
        <option value="Data Analyst">Data Analyst</option>
      </select>

      <select name="experience" value={job.experience} onChange={handleChange}>
        <option value="">Experience</option>
        <option value="Fresher">Fresher</option>
        <option value="1-2 years">1–2 years</option>
        <option value="3-5 years">3–5 years</option>
      </select>

      <select name="workType" value={job.workType} onChange={handleChange}>
        <option value="">Work Type</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Onsite">Onsite</option>
      </select>

      <input name="skills" placeholder="Skills (comma separated)" value={job.skills} onChange={handleChange} />

      <textarea name="description" placeholder="Job Description" value={job.description} onChange={handleChange}></textarea>

      <button onClick={createJob}>Post Job</button>
    </div>
    </>
  );
}
