import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CandidateProfile.css";

export default function CandidateProfile() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/candidate/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setUser({
          name: localStorage.getItem("userName"),
          email: localStorage.getItem("userEmail"),
        });
      })
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page">

      {/* TOP COVER BANNER */}
      <div className="cover-section"></div>

      {/* PROFILE CARD */}
      <div className="profile-card">

        {/* PROFILE IMAGE */}
        <img
          src={
            profile.photo
              ? `http://localhost:5000${profile.photo}`
              : "/avatar.png"
          }
          alt="Profile"
          className="profile-avatar-big"
        />

        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-location">📍 {profile.location || "No location provided"}</p>
        </div>

        <Link to="/candidate/edit" className="edit-profile-btn">
          ✏️ Edit Profile
        </Link>
      </div>

      {/* SKILLS */}
      <div className="profile-section">
        <h2>Skills</h2>
        <div className="skills-wrapper">
          {profile.skills?.length > 0 ? (
            profile.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))
          ) : (
            <p>No skills added</p>
          )}
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="profile-section">
        <h2>Experience</h2>
        <p>{profile.experience || "No experience provided"}</p>
      </div>

      {/* EDUCATION */}
      <div className="profile-section">
        <h2>Education</h2>
        <p>{profile.education || "No education provided"}</p>
      </div>

      {/* RESUME */}
      {profile.resume && (
        <div className="profile-section">
          <h2>Resume</h2>

          <a
            className="resume-btn"
            href={`http://localhost:5000${profile.resume}`}
            download
          >
            📄 Download Resume
          </a>
        </div>
      )}

    </div>
  );
}
