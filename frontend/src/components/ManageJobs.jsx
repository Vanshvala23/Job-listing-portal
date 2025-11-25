import axios from "axios";
import "./EmployerDashboard.css";

export default function ManageJobs({ jobs, setJobs }) {
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/employer/jobs/${id}`, { headers });
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div>
      <h1 className="section-title">Manage Jobs</h1>

      {jobs.length === 0 ? (
        <p>No job posts found.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-card-header">
                <h3>{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <div className="job-card-details">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.workType}</p>
                <p><strong>Experience:</strong> {job.experience}</p>
              </div>

              <div className="job-actions">
                <a href={`/edit-job/${job._id}`} className="btn-edit">
                  Edit
                </a>

                <button
                  className="btn-delete"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
