import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateInternships.css"
export default function CreateInternship() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    duration: "",
    workType: "",
    skills: "",
    description: "",
    stipend: "",
    qualifications: "",
    perks: "",
  });
  const [companyLogo, setCompanyLogo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      if (companyLogo) data.append("companyLogo", companyLogo);

      const res = await axios.post(
        "http://localhost:5000/api/internships",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming JWT auth
          },
        }
      );

      alert("Internship created successfully!");
      navigate(`/internships/${res.data.internship._id}`);
    } catch (err) {
      console.error(err);
      alert("Error creating internship");
    }
  };

  return (
    <div className="create-internship-page">
      <h2>Create Internship</h2>
      <form onSubmit={handleSubmit} className="internship-form">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input type="text" name="duration" placeholder="Duration (e.g., 3 Months)" value={formData.duration} onChange={handleChange} />
        <input type="text" name="workType" placeholder="Work Type (Remote/In-office)" value={formData.workType} onChange={handleChange} />
        <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />
        <input type="text" name="stipend" placeholder="Stipend (optional)" value={formData.stipend} onChange={handleChange} />
        <input type="text" name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} />
        <input type="text" name="perks" placeholder="Perks (comma separated)" value={formData.perks} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="file" name="companyLogo" onChange={handleFileChange} />
        <button type="submit">Create Internship</button>
      </form>
    </div>
  );
}
