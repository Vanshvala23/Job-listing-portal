// FindJobs.jsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Filters from "./findjobs/Filters";
import JobCard from "./findjobs/JobCard";
import Pagination from "./findjobs/Pagination";
import "./findjobs.css";

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    experience: "",
    workType: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const buildQuery = (p = 1) => {
    const params = {
      page: p,
      limit,
      keyword: filters.keyword,
      location: filters.location,
      category: filters.category,
      experience: filters.experience,
      workType: filters.workType,
    };

    return Object.keys(params)
      .filter((k) => params[k])
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");
  };

  const fetchJobs = async (p = 1) => {
    setLoading(true);

    try {
      const q = buildQuery(p);
      const url = `http://localhost:5000/api/jobs?${q}`;
      const res = await axios.get(url);

      setJobs(res.data.jobs || []);
      setPage(res.data.page || p);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Fetch jobs error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial jobs
  useEffect(() => {
    fetchJobs(1);
  }, []);

  // Fetch when filters change
  useEffect(() => {
    const t = setTimeout(() => fetchJobs(1), 300);
    return () => clearTimeout(t);
  }, [filters.category, filters.location, filters.experience, filters.workType]);

  const categoryChips = useMemo(
    () => [
      "Software Development",
      "Data Science",
      "Design",
      "Finance",
      "Marketing",
      "HR",
      "Sales",
    ],
    []
  );

  return (
    <>
      <Navbar />

      <div className="findjobs-page">
        {/* HERO SECTION */}
        <div className="findjobs-hero">
          <div className="findjobs-hero-inner">
            <div className="left">
              <h1>Find jobs that move your career forward</h1>
              <p>Deep filters, easy apply and curated opportunities for you.</p>
            </div>
          </div>
        </div>

        {/* CATEGORY CHIPS
        <div className="findjobs-chips">
          {categoryChips.map((cat) => (
            <div
              key={cat}
              className={`chip ${filters.category === cat ? "active" : ""}`}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  category: prev.category === cat ? "" : cat,
                }))
              }
            >
              {cat}
            </div>
          ))}
        </div> */}

        {/* MAIN CONTENT */}
        <div className="findjobs-main">
          {/* FILTER SIDEBAR */}
          <div className="findjobs-sidebar">
            <Filters filters={filters} setFilters={setFilters} />
          </div>

          {/* JOB LIST */}
          <div className="findjobs-list">
            <div className="list-header">
              <input
                type="text"
                placeholder="Search job title..."
                className="quick-search"
                value={filters.keyword}
                onChange={(e) =>
                  setFilters({ ...filters, keyword: e.target.value })
                }
              />

              {/* <button className="apply-btn" onClick={() => fetchJobs(1)}>
                Apply Filters
              </button> */}
            </div>

            {loading ? (
              <div className="loading">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="no-results">No jobs found</div>
            ) : (
              <div className="cards">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => fetchJobs(p)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
