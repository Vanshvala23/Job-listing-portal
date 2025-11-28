import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Candidate",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [emailStatus, setEmailStatus] = useState("");

  // =============================
  // REAL-TIME EMAIL CHECK
  // =============================
  useEffect(() => {
    if (!data.email) return;

    const delay = setTimeout(async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/check-email",
          { email: data.email }
        );

        if (res.data.exists) {
          setEmailStatus("❌ Email already exists");
        } else {
          setEmailStatus("✔ Email available");
        }
      } catch (err) {
        setEmailStatus("");
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [data.email]);

  // =============================
  // PASSWORD STRENGTH CHECK
  // =============================
  const evaluateStrength = (pass) => {
    if (pass.length < 6) return "Weak";
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/) && pass.length >= 8)
      return "Strong";
    return "Medium";
  };

  useEffect(() => {
    setPasswordStrength(evaluateStrength(data.password));
  }, [data.password]);

  // =============================
  // FORM SUBMIT
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
      return setTimeout(() => setError(""), 3000);
    }

    if (emailStatus === "❌ Email already exists") {
      setError("Email already registered!");
      return setTimeout(() => setError(""), 3000);
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

     setSuccess("Account created! Redirecting...");
    setTimeout(() => {
      window.location.href = `http://localhost:5173/verify-email?email=${encodeURIComponent(data.email)}`;
    }, 1500);

      // setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setTimeout(() => setError(""), 3000);
    }
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="auth-wrapper">
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
        <p>Join the Job Portal and begin your journey.</p>

        {success && <div className="success-box">{success}</div>}
        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <input
            className="auth-input"
            placeholder="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          {/* EMAIL */}
          <input
            className="auth-input"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {emailStatus && (
            <p
              style={{
                color: emailStatus.includes("available") ? "green" : "red",
                fontSize: "13px",
                marginTop: "-12px",
                marginBottom: "10px",
              }}
            >
              {emailStatus}
            </p>
          )}

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />

            <span
              className="pass-icon"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* PASSWORD STRENGTH */}
          {data.password && (
            <p
              style={{
                color:
                  passwordStrength === "Weak"
                    ? "red"
                    : passwordStrength === "Medium"
                    ? "orange"
                    : "green",
                marginTop: "-10px",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              Password Strength: {passwordStrength}
            </p>
          )}

          {/* CONFIRM PASSWORD */}
          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />

            <span
              className="pass-icon"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* PASSWORD MISMATCH */}
          {data.confirmPassword &&
            data.password !== data.confirmPassword && (
              <p style={{ color: "red", fontSize: "14px" }}>
                Passwords do not match
              </p>
            )}

          <button
            type="submit"
            className="auth-btn"
            disabled={
              data.password !== data.confirmPassword ||
              emailStatus === "❌ Email already exists"
            }
            style={{
              opacity:
                data.password !== data.confirmPassword ? 0.6 : 1,
            }}
          >
            Register
          </button>

          <a href="/login" className="auth-link">
            Already have an account?
          </a>
        </form>
      </div>
    </div>
  );
}
