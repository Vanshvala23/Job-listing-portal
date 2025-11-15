import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email:"", password:"" });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      localStorage.setItem("token", res.data.token);

      setSuccess("Login Successful!");
      setError("");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1200);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setSuccess("");

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <p>Access your account</p>

      {/* SUCCESS BOX */}
      {success && <div className="success-box">{success}</div>}

      {/* ERROR BOX */}
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

        <a href="/" className="auth-link">Create a new account</a>
      </form>
    </div>
  );
}
