import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ 
    name:"", 
    email:"", 
    password:"", 
    role:"Candidate" 
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);

      setSuccess("Registered Successfully!");
      setError("");

      // Clear message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="auth-container">

      {/* Role Selector */}
      <div className="role-top-selector">
        <button
          className={data.role === "Candidate" ? "role-btn active" : "role-btn"}
          onClick={() => setData({ ...data, role: "Candidate" })}
        >
          Candidate
        </button>

        <button
          className={data.role === "Employer" ? "role-btn active" : "role-btn"}
          onClick={() => setData({ ...data, role: "Employer" })}
        >
          Employer
        </button>
      </div>

      <h2>Create Account</h2>
      <p>Join the Job Portal and start your journey!</p>

      {/* SUCCESS MESSAGE */}
      {success && <div className="success-box">{success}</div>}

      {/* ERROR MESSAGE */}
      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button type="submit" className="auth-btn">Register</button>

        <a href="/login" className="auth-link">Already have an account?</a>
      </form>
    </div>
  );
}
