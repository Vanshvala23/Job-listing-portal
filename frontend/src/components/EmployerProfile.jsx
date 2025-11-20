import { useState, useEffect } from "react";
import axios from "axios";

export default function EmployerProfile() {
  const [profile, setProfile] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    location: "",
    about: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: ""
  });

  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/employer/me", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      if (res.data) setProfile(res.data);
    });
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    Object.keys(profile).forEach(key => formData.append(key, profile[key]));
    if (logo) formData.append("logo", logo);

    await axios.post("/api/employer/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Employer Profile Updated!");
  };

  return (
    <div className="dashboard">
      <h1>Edit Employer Profile</h1>

      <form onSubmit={saveProfile}>

        <input className="auth-input"
          placeholder="Company Name"
          value={profile.companyName}
          onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
        />

        <input className="auth-input"
          placeholder="Industry"
          value={profile.industry}
          onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
        />

        <input className="auth-input"
          placeholder="Company Size"
          value={profile.companySize}
          onChange={(e) => setProfile({ ...profile, companySize: e.target.value })}
        />

        <input className="auth-input"
          placeholder="Location"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />

        <textarea className="auth-input"
          placeholder="About Company"
          value={profile.about}
          onChange={(e) => setProfile({ ...profile, about: e.target.value })}
        />

        <input className="auth-input"
          placeholder="Contact Person"
          value={profile.contactPerson}
          onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
        />

        <input className="auth-input"
          placeholder="Contact Email"
          value={profile.contactEmail}
          onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
        />

        <input className="auth-input"
          placeholder="Contact Phone"
          value={profile.contactPhone}
          onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
        />

        <input type="file" onChange={(e) => setLogo(e.target.files[0])} />

        <button className="auth-btn">Save Profile</button>
      </form>
    </div>
  );
}
