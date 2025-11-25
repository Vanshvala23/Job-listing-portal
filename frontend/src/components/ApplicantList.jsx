import axios from "axios";

export default function ApplicantList({ applicants, setApplicants }) {
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  const updateStatus = async (id, status) => {
    try{
        await axios.put(
      `http://localhost:5000/api/employer/applicant/status/${id}`,
      { status },
      { headers }
    );

    setApplicants((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );
    alert(`Status updated to "${status}" and email sent to candidate.`);
    
  } catch (err) {
    console.error(err);
    alert("Failed to update status");
  }
  };

  return (
    <div>
      <h1>Applicants</h1>

      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="job-list">
          {applicants.map((a) => (
            <div key={a._id} className="job-card">
              <h3>{a.userName} — {a.jobTitle}</h3>
              <p>Email: {a.email}</p>
              <p>Status: <strong>{a.status}</strong></p>

              <select
  className="status-dropdown"
  value={a.status}
  onChange={(e) => updateStatus(a._id, e.target.value)}
>
  <option value="applied">Applied</option>
  <option value="viewed">Viewed</option>
  <option value="shortlisted">Shortlisted</option>
  <option value="hired">Hired</option>
  <option value="rejected">Rejected</option>
</select>


            </div>
          ))}
        </div>
      )}
    </div>
  );
}
