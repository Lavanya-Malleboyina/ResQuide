import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">

      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        🛡️ ResQGuide
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        {user && (
          <Link
            to={user.role === "admin" ? "/admin" : "/user"}
            className="hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}

      </div>

    </div>
  );
}

export default Navbar;
