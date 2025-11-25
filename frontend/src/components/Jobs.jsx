// frontend/src/components/Jobs.jsx
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "", location: "", category: "", experience: "", workType: ""
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const fetchJobs = async (p = 1) => {
    const params = {
      page: p, limit,
      keyword: filters.keyword,
      location: filters.location,
      category: filters.category,
      experience: filters.experience,
      workType: filters.workType
    };
    const query = Object.keys(params)
      .filter(k => params[k] !== "" && params[k] !== null && typeof params[k] !== "undefined")
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&");

    const url = `http://localhost:5000/api/jobs?${query}`;
    const res = await axios.get(url);
    setJobs(res.data.jobs);
    setPage(res.data.page);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchJobs(1);
    // eslint-disable-next-line
  }, []);

  const applyFilters = () => fetchJobs(1);

  const goPage = (p) => {
    if (p < 1 || p > totalPages) return;
    fetchJobs(p);
  };

  return (
    <>
    <Navbar/>
    <div className="jobs-wrapper">
      <aside className="filter-panel">
        <h3>Filters</h3>
        <input className="filter-input" placeholder="🔎 Keyword" value={filters.keyword}
          onChange={e => setFilters({...filters, keyword: e.target.value})} />
        <input className="filter-input" placeholder="📍 Location" value={filters.location}
          onChange={e => setFilters({...filters, location: e.target.value})} />
        <select className="filter-select" value={filters.category}
          onChange={e => setFilters({...filters, category: e.target.value})}>
          <option value="">Category</option>
          <option>Software</option><option>Finance</option><option>Marketing</option><option>Design</option>
        </select>
        <select className="filter-select" value={filters.experience}
          onChange={e => setFilters({...filters, experience: e.target.value})}>
          <option value="">Experience</option><option>Fresher</option><option>1-2 years</option><option>3-5 years</option>
        </select>
        <select className="filter-select" value={filters.workType}
          onChange={e => setFilters({...filters, workType: e.target.value})}>
          <option value="">Work Type</option><option>Remote</option><option>Hybrid</option><option>Onsite</option>
        </select>

        <button className="apply-filter-btn" onClick={applyFilters}>Apply</button>
      </aside>

      <section className="job-section">
        <h2 className="job-heading">Available Jobs</h2>

        {jobs.length === 0 ? <p className="no-results">No jobs</p> :
        jobs.map(job => (
          <div key={job._id} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className="job-company">{job.company}</span>
            </div>

            <div className="job-tags">
              <span>📍 {job.location}</span>
              <span>💼 {job.experience || "-"}</span>
              <span>💻 {job.workType || "-"}</span>
            </div>

            <p className="job-skills"><strong>Skills:</strong> {job.skills?.join(", ")}</p>

            <div style={{display:'flex', gap:10, marginTop:10}}>
              <button className="apply-btn" onClick={() => window.location.href=`/jobs/${job._id}`}>View</button>
              <button className="apply-btn" onClick={async()=>{
                const token = localStorage.getItem("token");
                if(!token){ alert("Login as candidate to save"); return; }
                try{
                  await axios.post(`http://localhost:5000/api/jobs/${job._id}/save`, {}, {headers:{Authorization:`Bearer ${token}`}});
                  alert("Job Saved Successfully");
                }catch(e){ console.error(e); alert(e.response?.data?.message || "Error") }
              }}>Save</button>
            </div>
          </div>
        ))}
        {/* pagination */}
        <div style={{display:'flex', gap:8, marginTop:16, alignItems:'center'}}>
          <button disabled={page<=1} onClick={()=>goPage(page-1)}>Prev</button>
          <span style={{color:'black'}}>Page {page} / {totalPages}</span>
          <button disabled={page>=totalPages} onClick={()=>goPage(page+1)}>Next</button>
        </div>
      </section>
    </div>
    </>
  );
}
