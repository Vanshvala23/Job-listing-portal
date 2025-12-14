import { useEffect, useState } from "react";
import axios from "axios";
import "./EditCandidateProfile.css";

export default function EditCandidateProfile() {
  const [profile, setProfile] = useState({
    phone: "",
    location: "",
    skills: "",
    experience: "",
    education: "",
    profileImage: ""
  });

  const [resume, setResume] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

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
            profileImage: res.data.profileImage || ""
          });
          setPreviewImage(
            res.data.profileImage
              ? `http://localhost:5000${res.data.profileImage}`
              : "/avatar.png"
          );
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
    formData.append("skills", JSON.stringify(skillsArray));
    formData.append("experience", profile.experience);
    formData.append("education", profile.education);

    if (resume) formData.append("resume", resume);
    if (profileImageFile) formData.append("profileImage", profileImageFile);

    try {
      await axios.post("http://localhost:5000/api/candidate/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      window.location.href = "/candidate/profile";
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);
      alert("Error saving profile!");
    }
  };

  // handle preview
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="edit-container">
      <h1>Edit Profile</h1>

      {/* PROFILE IMAGE SECTION */}

      <form onSubmit={saveProfile} className="edit-form">
        <label>Phone</label>
        <input
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />

        <label>Location</label>
        <input
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />

        <label>Skills (comma separated)</label>
        <input
          value={profile.skills}
          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
        />

        <label>Experience</label>
        <textarea
          value={profile.experience}
          onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
        />

        <label>Education</label>
        <textarea
          value={profile.education}
          onChange={(e) => setProfile({ ...profile, education: e.target.value })}
        />

        <label>Resume (PDF)</label>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        <label>Profile Image</label>
        <input type="file" onChange={handleProfilePicUpload} />
        <button className="save-btn">Save Changes</button>
      </form>
    </div>
  );
}
