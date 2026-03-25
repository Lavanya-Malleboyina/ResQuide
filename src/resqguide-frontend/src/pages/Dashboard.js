import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  }, [user, navigate]);

  return null;
}

export default Dashboard;
