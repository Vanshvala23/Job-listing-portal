import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");

  if (!token || role !== "Admin") {
    return <Navigate to="/admin-login" />;
  }

  return children;
}
