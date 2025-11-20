import { useEffect, useState } from "react";
import axios from "axios";

export default function CandidateProfile() {
  const [profile, setProfile] = useState({
    phone: "",
    location: "",
    skills: "",
    experience: "",
    education: ""
  });

  const [resume, setResume] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/candidate/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setProfile({
            phone: res.data.phone || "",
            location: res.data.location || "",
            skills: res.data.skills ? res.data.skills.join(", ") : "",
            experience: res.data.experience || "",
            education: res.data.education || "",
          });
        }
      });
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();

    const skillsArray = profile.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    formData.append("phone", profile.phone);
    formData.append("location", profile.location);
    formData.append("skills", JSON.stringify(skillsArray)); // FIXED
    formData.append("experience", profile.experience);
    formData.append("education", profile.education);

    if (resume) formData.append("resume", resume);

    try {
      await axios.post("http://localhost:5000/api/candidate/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      //redirect to dashboard after profile completion
        setTimeout(() => {
          window.location.href = "/candidate/dashboard";
        });
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err.response?.data || err);
      alert("Error saving profile!");
    }
  };

  return (
    <div className="dashboard">
      <h1>Edit Candidate Profile</h1>

      <form onSubmit={saveProfile}>
        <input
          className="auth-input"
          placeholder="Phone"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />

        <input
          className="auth-input"
          placeholder="Location"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />

        <input
          className="auth-input"
          placeholder="Skills (comma separated)"
          value={profile.skills}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
        />

        <textarea
          className="auth-input"
          placeholder="Experience"
          value={profile.experience}
          onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
        />

        <textarea
          className="auth-input"
          placeholder="Education"
          value={profile.education}
          onChange={(e) => setProfile({ ...profile, education: e.target.value })}
        />

        <input type="file" onChange={(e) => setResume(e.target.files[0])} />

        <button className="auth-btn">Save Profile</button>
      </form>
    </div>
  );
}
