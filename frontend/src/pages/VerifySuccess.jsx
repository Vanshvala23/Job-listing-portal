import "./VerifySuccess.css";
export default function VerifySuccess() {
  return (
    <div className="success-screen">
      <h1>Email Verified Successfully!</h1>
      <p>Your account is now active. You can log in and continue.</p>

      <button
        className="login-btn"
        onClick={() => (window.location.href = "/login")}
      >
        Go to Login
      </button>
    </div>
  );
}
