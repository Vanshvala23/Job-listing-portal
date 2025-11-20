import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      const user = res.data.user;
      const role = user.role;
      const isProfileDone = user.profileCompleted;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("user", JSON.stringify(user));


      setSuccess("Login Successful!");
      setError("");

      setTimeout(() => {
        if (role === "Admin") {
          window.location.href = "/admin";
        }

        // Employer
        if (role === "Employer") {
          if (!isProfileDone) {
            window.location.href = "/employer/profile";
          } else {
            window.location.href = "/employer/dashboard";
          }
        }

        // Candidate
        else if (role === "Candidate") {
          if (!isProfileDone) {
            window.location.href = "/candidate/profile";
          } else {
            window.location.href = "/";
          }
        }
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setSuccess("");

      setTimeout(() => setError(""), 2500);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Login</h2>
        <p>Access your account</p>

        {success && <div className="success-box">{success}</div>}
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="auth-btn">Login</button>

          <a href="/register" className="auth-link">Create a new account</a>
        </form>
      </div>
    </div>
  );
}
