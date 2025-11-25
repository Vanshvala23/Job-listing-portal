// frontend/src/components/Applicants.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Applicants({ jobId }) {
  const [apps, setApps] = useState([]);
  useEffect(()=> {
    const token = localStorage.getItem("token");
    if(!token) return;
    axios.get(`http://localhost:5000/api/jobs/${jobId}/applicants`, { headers:{Authorization:`Bearer ${token}`} })
      .then(res=>setApps(res.data)).catch(console.error);
  }, [jobId]);

  return (
    <div>
      <h3>Applicants</h3>
      {apps.map(a => (
        <div key={a._id} style={{border:'1px solid #eee', padding:10, marginBottom:8}}>
          <p><b>{a.candidate?.name}</b> — {a.candidate?.email}</p>
          <p>Skills: {a.candidate?.skills?.join(", ")}</p>
          <p>Status: {a.status}</p>
          {a.resume && <a href={`http://localhost:5000/${a.resume}`} target="_blank" rel="noreferrer">View Resume</a>}
        </div>
      ))}
    </div>
  );
}
