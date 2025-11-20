import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
/* AUTH */
import Register from "./components/Register";
import Login from "./components/Login";

/* CANDIDATE */
import CandidateDashboard from "./components/CandidateDashboard";
import CandidateProfile from "./components/CandidateProfile";

/* EMPLOYER */
import EmployerDashboard from "./components/EmployerDashboard";
import EmployerProfile from "./components/EmployerProfile";

/* ADMIN */
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUser";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

/* PROTECTED ROUTES */
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ===========================
            CANDIDATE ROUTES
        ============================ */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute role="Candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate/profile"
          element={
            <ProtectedRoute role="Candidate">
              <CandidateProfile />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            EMPLOYER ROUTES
        ============================ */}
        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute role="Employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/profile"
          element={
            <ProtectedRoute role="Employer">
              <EmployerProfile />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            ADMIN ROUTES
        ============================ */}

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <ManageUsers />
            </AdminProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
