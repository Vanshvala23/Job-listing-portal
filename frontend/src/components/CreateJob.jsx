import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./CreateJob.css";

export default function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    experience: "",
    workType: "",
    skills: "",
    salary: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    perks: [],
  });

  const [companyLogo, setCompanyLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [perkInput, setPerkInput] = useState("");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompanyLogo(file);

    if (file) setPreviewLogo(URL.createObjectURL(file));
  };

  const addPerk = () => {
    if (perkInput.trim() !== "") {
      setJob({ ...job, perks: [...job.perks, perkInput.trim()] });
      setPerkInput("");
    }
  };

  const removePerk = (index) => {
    const updatedPerks = [...job.perks];
    updatedPerks.splice(index, 1);
    setJob({ ...job, perks: updatedPerks });
  };

  const createJob = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login as Employer first.");

    try {
      const formData = new FormData();

      Object.keys(job).forEach((key) => {
        if (key === "skills") {
          const skillsArray = job.skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          formData.append("skills", JSON.stringify(skillsArray));
        } else if (key === "perks") {
          formData.append("perks", JSON.stringify(job.perks));
        } else {
          formData.append(key, job[key]);
        }
      });

      if (companyLogo) formData.append("companyLogo", companyLogo);

      await axios.post("http://localhost:5000/api/jobs/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
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
        salary: "",
        description: "",
        qualifications: "",
        responsibilities: "",
        perks: [],
      });
      setCompanyLogo(null);
      setPreviewLogo(null);
    } catch (err) {
      console.error(err);
      alert("Error posting job. Check console for details.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-job-container">
        <h2>Post a New Job</h2>

        <input
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
        />
        <input
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
        />
        <select name="category" value={job.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Software">Software</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
          <option value="Data Analyst">Data Analyst</option>
        </select>

        <select
          name="experience"
          value={job.experience}
          onChange={handleChange}
        >
          <option value="">Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 years">1–2 years</option>
          <option value="3-5 years">3–5 years</option>
          <option value="5+ years">5+ years</option>
        </select>

        <select name="workType" value={job.workType} onChange={handleChange}>
          <option value="">Work Type</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>
        </select>

        <input
          name="salary"
          placeholder="Salary (optional)"
          value={job.salary}
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="Skills / Technologies (comma separated)"
          value={job.skills}
          onChange={handleChange}
        />

        <textarea
          name="qualifications"
          placeholder="Qualifications Required"
          value={job.qualifications}
          onChange={handleChange}
        />

        <textarea
          name="responsibilities"
          placeholder="Job Responsibilities"
          value={job.responsibilities}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description / Overview"
          value={job.description}
          onChange={handleChange}
        />

        {/* Perks Section */}
        <div className="perk-section">
          <label>Add Perks / Benefits (Optional)</label>
          <div className="perk-input-group">
            <input
              type="text"
              placeholder="e.g. Health Insurance"
              value={perkInput}
              onChange={(e) => setPerkInput(e.target.value)}
            />
            <button type="button" onClick={addPerk}>
              Add
            </button>
          </div>
          <ul className="perk-list">
            {job.perks.map((p, idx) => (
              <li key={idx}>
                {p} <span onClick={() => removePerk(idx)}>❌</span>
              </li>
            ))}
          </ul>
        </div>

        <label>Company Logo</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewLogo && (
          <img
            src={previewLogo}
            alt="Company Logo Preview"
            className="logo-preview"
          />
        )}

        <button onClick={createJob}>Post Job</button>
      </div>
    </>
  );
}
