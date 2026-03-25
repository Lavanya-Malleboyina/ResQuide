import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import RiskResult from "./pages/RiskResult";
import RiskReport from "./pages/RiskReport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/"        element={<Landing />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register"element={<Register />} />

        {/* Shared */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* User */}
        <Route path="/user"              element={<UserDashboard />} />
        <Route path="/assessment/:type"  element={<Questionnaire />} />
        <Route path="/result"            element={<RiskResult />} />
        <Route path="/report"            element={<RiskReport />} />

        {/* Admin — nested routes handled inside AdminDashboard */}
        <Route path="/admin/*" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
