// Filters.jsx
import React from "react";

export default function Filters({ filters, setFilters, onApply }) {
  return (
    <div className="filters-panel">
      <h3>Filters</h3>

      <label className="f-label">Location</label>
      <input
        className="f-input"
        placeholder="City, state..."
        value={filters.location}
        onChange={(e) => setFilters((s) => ({ ...s, location: e.target.value }))}
      />

      <label className="f-label">Category</label>
      <select
        className="f-input"
        value={filters.category}
        onChange={(e) => setFilters((s) => ({ ...s, category: e.target.value }))}
      >
        <option value="">Any</option>
        <option>Software Development</option>
        <option>Data Science</option>
        <option>Design</option>
        <option>Finance</option>
        <option>Marketing</option>
      </select>

      <label className="f-label">Experience</label>
      <select
        className="f-input"
        value={filters.experience}
        onChange={(e) => setFilters((s) => ({ ...s, experience: e.target.value }))}
      >
        <option value="">Any</option>
        <option>Fresher</option>
        <option>1-2 years</option>
        <option>3-5 years</option>
        <option>5+ years</option>
      </select>

      <label className="f-label">Work Type</label>
      <select
        className="f-input"
        value={filters.workType}
        onChange={(e) => setFilters((s) => ({ ...s, workType: e.target.value }))}
      >
        <option value="">Any</option>
        <option>Remote</option>
        <option>Hybrid</option>
        <option>Onsite</option>
      </select>

      <button className="f-apply" onClick={onApply}>Apply Filters</button>
      <button className="f-clear" onClick={() => {
        setFilters({ keyword: "", location: "", category: "", experience: "", workType: "" });
        onApply();
      }}>Clear</button>
    </div>
  );
}
