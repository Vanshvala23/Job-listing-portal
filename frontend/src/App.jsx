import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUser";
import AdminProtectedRoute from "./components/AdminProtectedRoute";


import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

      {/* ADMIN  */}
      <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <AdminProtectedRoute>
            <ManageUsers />
          </AdminProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
