
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import HrDashboard from "./pages/HrDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import InterviewerDashboard from "./pages/InterviewerDashboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link className="linker" to="/login">Login</Link>
          <Link className="linker" to="/register">Register</Link>
        </nav>
        <Routes>
        
        <Route path="/HrDashboard" element={<HrDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/CandidateDashboard" element={<CandidateDashboard />} />
        <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />
        <Route path="/InterviewerDashboard" element={<InterviewerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;