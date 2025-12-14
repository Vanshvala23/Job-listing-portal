import {useState,useEffect}from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";
/* AUTH */
import Register from "./components/Register";
import Login from "./components/Login";

import FindJobs from "./components/FindJobs";

import VerifyEmailNotice from "./pages/VerifyEmailNotice";
import VerifySuccess from "./pages/VerifySuccess";

import LoadingScreen from "./components/LoadingScreen";

import CreateJob from "./components/CreateJob";
import CreateInternship from "./components/CreateInternships";
import InternshipDetails from "./components/InternshipDetails";
import CompetePage from "./pages/Candidate/CompetePage";

/* CANDIDATE */
import CandidateDashboard from "./components/CandidateDashboard";
import CandidateProfile from "./components/CandidateProfile";
import EditCandidateProfile from "./components/EditCandidateProfile";

import SavedJobs from "./pages/Candidate/SavedJobs";
import Application from "./pages/Candidate/Application";

/* EMPLOYER */
import EmployerDashboard from "./components/EmployerDashboard";
import EmployerProfile from "./components/EmployerProfile";

/* ADMIN */
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUser";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ApplyJob from "./components/ApplyJob";
import Internships from "./components/Internships";
/* PROTECTED ROUTES */
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // simulate 2 sec loading
  }, []);
  return (
    <>{loading ? <LoadingScreen /> :
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmailNotice />} />

        <Route path="/verify-success" element={<VerifySuccess />} />


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
        <Route path="/candidate/edit" element={<EditCandidateProfile />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/create-internships" element={<CreateInternship />} />

          
<Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/internships/:id" element={<InternshipDetails />} />

        <Route path="/find-jobs" element={<FindJobs />} />
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
        <Route path="/candidate/saved-jobs" element={<SavedJobs />} />

        <Route
          path="/employer/profile"
          element={
            <ProtectedRoute role="Employer">
              <EmployerProfile />
            </ProtectedRoute>
          }
        />

                <Route 
          path="/jobs" 
          element={
            <ProtectedRoute role="Candidate">
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route path="/compete" element={<CompetePage />}/>
<Route path="/candidate/applied" element={<Application />} />

        <Route path="/jobs/:id" element={<ProtectedRoute role="Candidate"><JobDetails /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<JobDetails />} />

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
    </Router>}
    </>
  );
}

export default App;
