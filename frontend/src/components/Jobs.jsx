import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Jobs.css";
import heroImg from "../images/hero.jpg";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    experience: "",
    workType: ""
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [companyLogo, setCompanyLogo] = useState(false);
  const limit = 12;

  const fetchJobs = async (p = 1) => {
    const params = {
      page: p,
      limit,
      keyword: filters.keyword,
      location: filters.location,
      category: filters.category,
      experience: filters.experience,
      workType: filters.workType,
      companyLogo: jobs.companyLogo ? true : undefined
    };

    const query = Object.keys(params)
      .filter(k => params[k])
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");

    const res = await axios.get(`http://localhost:5000/api/jobs?${query}`);
    setJobs(res.data.jobs);
    setPage(res.data.page);
    setTotalPages(res.data.totalPages);
    setCompanyLogo(params.companyLogo);
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const applyFilters = () => fetchJobs(1);

  const goPage = (p) => {
    if (p < 1 || p > totalPages) return;
    fetchJobs(p);
  };

  const generateColors=(company)=>
  {
    if (!company) return ["#6a11cb", "#2575fc"]; // fallback

  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 60) % 360;

  return [
    `hsl(${h1}, 82%, 62%)`,
    `hsl(${h2}, 82%, 52%)`
  ];
  }

  return (
    <>
      <Navbar />

      <div className="jobs-hero-section">
        <div className="jobs-hero-content">
          <div>
            <h1>
              Discover <span>Your Dream Job</span> Today
            </h1>
            <p>
              Explore thousands of internships, fresher & experienced jobs.
            </p>

            <div className="jobs-hero-btns">
              <button className="primary-btn" onClick={()=>window.location.href=`/find-jobs`}>Find Jobs</button>
              <button className="outline-btn">Post a Job</button>
            </div>
          </div>

          <img src={heroImg} alt="hero" className="hero-art" />
        </div>
      </div>

      <div className="category-section">
  <h2 className="category-title">Jobs Category</h2>

  <div className="category-list">
    {[
      { name: "Software Development", icon: "💻", color: "#ebe4ff" },
      { name: "Data Analyst", icon: "⚛️", color: "#daf5e7" },
      { name: "Graphic Design", icon: "🎨", color: "#ffe7d6" },
      { name: "Marketing", icon: "📣", color: "#dcecff" },
      { name: "Finance", icon: "💰", color: "#ffe8d8" },
    ].map((cat) => (
      <div className="category-pill" key={cat.name}>
        <div className="icon-circle" style={{ background: cat.color }}>
          {cat.icon}
        </div>
        <span>{cat.name}</span>
      </div>
    ))}
  </div>
</div>


      <div className="jobs-layout">

        {/* JOB LIST */}
        <section className="job-listing">
          <h2 className="jobs-heading">Latest Opportunities</h2>

          <div className="job-grid">
            {jobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-banner" style={{background:`linear-gradient(135deg,${generateColors(job.company)[0]},${generateColors(job.company)[1]})`}}>
                  {/* Make a nice design */}
                  <div className="job-design">
                    
                  </div>
                  <span className="job-tag">{job.workType || "In Office"}</span>

                  <div className="job-logo-box">
  {job.companyLogo ? (
   <img
  src={`http://localhost:5000${job.companyLogo}`}
  alt="Company Logo"
  style={{ width: "120px", borderRadius: "10px" }}
/>


  ) : (
    job.company?.charAt(0)
  )}
</div>
                </div>

                <div className="job-body">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-company">{job.company}</div>

                  <div className="job-meta">
                    <span>{job.experience}</span>
                    <span>📍 {job.location}</span>
                  </div>
                  <button className="view-btn" onClick={() => window.location.href = `/jobs/${job._id}`}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button onClick={() => goPage(page - 1)} disabled={page === 1}>
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => goPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
