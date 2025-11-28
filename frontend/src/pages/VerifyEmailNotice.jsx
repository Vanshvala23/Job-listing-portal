import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./VerifyEmail.css";

export default function VerifyEmailNotice() {
  const [params] = useSearchParams();
  const token = params.get("token"); // get token from query
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) return;

    // Call backend to verify the email
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        // redirect to success page
        window.location.href = "/verify-success";
      } catch (error) {
        setStatus("Invalid or expired verification link.");
      }
    };

    verifyEmail();
  }, [token]);

  const resendVerification = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/resend-verification", {
        token,
      });
      alert("Verification email sent again!");
    } catch (error) {
      alert("Failed to resend email");
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-box">
        <h2>Verify Your Email</h2>
        <p>{status}</p>

        <button className="resend-btn" onClick={resendVerification}>
          Resend Email
        </button>

        <button
          className="continue-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Already Verified? Login
        </button>
      </div>
    </div>
  );
}
