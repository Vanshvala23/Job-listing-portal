import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import "./CompetePage.css";

export default function CompetePage() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/competitions");
        setCompetitions(res.data);
      } catch (err) {
        console.error("Error fetching competitions:", err);
      }
      setLoading(false);
    };

    fetchCompetitions();
  }, []);

  if (loading) return <div className="compete-loading">Loading competitions...</div>;

  return (
    <>
      <Navbar />
      <div className="compete-wrapper">
        <h1 className="compete-heading"><span>Unlock</span> Opportunities</h1>
        <p className="compete-subheading">
          Explore hackathons, quizzes, challenges, and contests from top companies.
        </p>
        <button className="find-btn">Find Competitions</button>
        <button className="host-btn">Host a Competition</button>

        {competitions.length === 0 ? (
          <p className="compete-empty">No competitions available at the moment.</p>
        ) : (
          <div className="compete-grid">
            {competitions.map((comp) => (
              <div key={comp._id} className="compete-card">
                <img
                  src={comp.image ? `http://localhost:5000${comp.image}` : "/default-comp.png"}
                  alt={comp.title}
                  className="compete-image"
                />
                <div className="compete-info">
                  <h3 className="compete-title">{comp.title}</h3>
                  <p className="compete-company">{comp.company}</p>
                  <p className="compete-type">{comp.type}</p>
                  <p className="compete-deadline">
                    Deadline: {new Date(comp.deadline).toLocaleDateString()}
                  </p>
                </div>
                <a href={`/compete/${comp._id}`} className="compete-btn">
                  Participate
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
