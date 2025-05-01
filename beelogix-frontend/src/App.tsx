import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AuthWrapper from "./components/AuthWrapper";
import DashboardPage from "./pages/Dashboard";
import Cookies from "js-cookie";
import NavigationBar from "./pages/Navbar";
import AddProject from "./pages/AddProject";
import Projects from "./pages/Projects";
import AddTask from "./pages/AddTask";
import SignUp from "./components/Signup";

const App: React.FC = () => {
  const handleSignOut = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };
  return (
    <Router>
      <AuthWrapper>
        <NavigationBar onSignOut={handleSignOut} />
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project" element={<AddProject />} />
          <Route path="/projectsList" element={<Projects />} />
          <Route path="/add-task/:projectId" element={<AddTask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthWrapper>
    </Router>
  );
};

export default App;
