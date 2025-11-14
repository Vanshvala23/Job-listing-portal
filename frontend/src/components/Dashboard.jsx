import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setUser(res.data));
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
