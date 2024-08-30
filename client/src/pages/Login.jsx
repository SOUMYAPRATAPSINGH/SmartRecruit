import { useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import HRDashboard from "./HrDashboard";
import InterviewerDashboard from "./InterviewerDashboard";
import CandidateDashboard from "./CandidateDashboard";
import RecruiterDashboard from "./RecruiterDashboard";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      setMessage(response.data.message);
      setRole(response.data.role); // Set role after successful login
    } catch (error) {
      setMessage("Error logging in");
    }
    if (role === "Admin") {
      navigate("/AdminDashboard");
    } else if (role === "Candidate") {
      navigate("/CandidateDashboard");
    } else if (role === "Recruiter") {
      navigate("/RecruiterDashboard");
    } else {
      navigate("/HrDashboard");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      {role === "Admin" && <AdminDashboard />}
      {role === "HR Manager" && <HRDashboard />}
      {role === "Recruiter" && <RecruiterDashboard />}
      {role === "Interviewer" && <InterviewerDashboard />}
      {role === "Candidate" && <CandidateDashboard />}
    </div>
  );
};

export default Login;
