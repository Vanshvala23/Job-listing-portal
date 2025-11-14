import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"", role:"Employee" });


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", data);
    alert("Registered Successfully!");
  };

  return (
    <div className="auth-container">
      <div className="role-top-selector">
  <button
    className={data.role === "Employee" ? "role-btn active" : "role-btn"}
    onClick={() => setData({ ...data, role: "Employee" })}
  >
    Employee
  </button>

  <button
    className={data.role === "HR" ? "role-btn active" : "role-btn"}
    onClick={() => setData({ ...data, role: "HR" })}
  >
    HR
  </button>
</div>

      <h2>Create Account</h2>
      <p>Join the Job Portal and start your journey!</p>

      <form onSubmit={handleSubmit}>
        <input
          className="auth-input"
          placeholder="Name"
          onChange={(e)=>setData({...data,name:e.target.value})}
        />

        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e)=>setData({...data,email:e.target.value})}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e)=>setData({...data,password:e.target.value})}
        />

        <button type="submit" className="auth-btn">Register</button>

        <a href="/login" className="auth-link">Already have an account?</a>
      </form>
    </div>
  );
}
