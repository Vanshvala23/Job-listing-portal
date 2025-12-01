// Pagination.jsx
import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  const prev = () => onChange(Math.max(1, page - 1));
  const next = () => onChange(Math.min(totalPages, page + 1));

  return (
    <div className="fj-pagination">
      <button className="pg-btn" onClick={prev} disabled={page <= 1}>Prev</button>
      <div className="pg-info">Page <strong>{page}</strong> of {totalPages}</div>
      <button className="pg-btn" onClick={next} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
