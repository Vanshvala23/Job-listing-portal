import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./InternshipDetails.css";

export default function InternshipDetails() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/internships/${id}`)
      .then((res) => setInternship(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!internship) return <p>Loading...</p>;

  return (
    <div className="internship-page">
      {/* Banner */}
      <div className="banner">
        <div className="logo">
          {internship.companyLogo ? (
            <img src={`http://localhost:5000${internship.companyLogo}`} alt="logo" />
          ) : (
            internship.company.charAt(0)
          )}
        </div>
        <div className="title-section">
          <h1>{internship.title}</h1>
          <h2>{internship.company}</h2>
          <div className="tags">
            {internship.location && <span>📍 Location: {internship.location}</span>}
            {internship.workType && <span>💼 Work Type: {internship.workType}</span>}
            {internship.duration && <span>⏱ Duration: {internship.duration}</span>}
            {internship.stipend && <span>💰 Stipend: {internship.stipend}</span>}
          </div>
        </div>
        {/* <button className="apply-btn">Apply Now</button> */}
      </div>

      {/* Main grid */}
      <div className="main-grid">
        {/* Left section */}
        <div className="left">
          <section className="card">
            <h3>Description</h3>
            <p>{internship.description || "No description provided."}</p>
          </section>
          {internship.qualifications && (
            <section className="card">
              <h3>Qualifications</h3>
              <p>{internship.qualifications}</p>
            </section>
          )}
          {internship.skills && internship.skills.length > 0 && (
            <section className="card">
              <h3>Skills Required</h3>
              <div className="skills">
                {internship.skills.map((skill, idx) => (
                  <span key={idx}>{skill}</span>
                ))}
              </div>
            </section>
          )}
          {internship.perks && internship.perks.length > 0 && (
            <section className="card">
              <h3>Perks</h3>
              <ul>
                {internship.perks.map((perk, idx) => (
                  <li key={idx}>{perk}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right section */}
        <div className="right">
          <div className="card sticky">
            <h3>Quick Info</h3>
            <ul>
              {internship.duration && <li><strong>Duration:</strong> {internship.duration}</li>}
              {internship.stipend && <li><strong>Stipend:</strong> {internship.stipend}</li>}
              {internship.workType && <li><strong>Work Type:</strong> {internship.workType}</li>}
              <li><strong>Location:</strong> {internship.location}</li>
            </ul>
            <button className="apply-btn">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
