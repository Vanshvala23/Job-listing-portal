import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/login" />;

  return children;
}
