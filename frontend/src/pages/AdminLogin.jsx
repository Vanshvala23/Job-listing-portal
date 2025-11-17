import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminRole", res.data.user.role);

      window.location.href = "/admin";

    } catch (err) {
      setMsg("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      {msg && <div className="error-box">{msg}</div>}

      <form onSubmit={login}>
        <input className="auth-input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input className="auth-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="auth-btn">Login</button>
      </form>
    </div>
  );
}
