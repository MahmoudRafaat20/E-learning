import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";

const defaultPathByRole = (role) => {
  if (role === "admin") return "/dashboard";
  if (role === "superadmin") return "/admins";
  return "/lessons"; // student/default
};

const Login = () => {
  const { login, user, role } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // If PrivateRoute bounced the user, it put the target here:
  const from = location.state?.from?.pathname || defaultPathByRole(role);

  // If already authenticated and we land on /login, push them to their home
  useEffect(() => {
    if (user?.token) {
      navigate(from, { replace: true });
    }
  }, [user?.token, from, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result?.success) {
      // ✅ redirect after successful login
      navigate(from, { replace: true });
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen p-5">
      {/* If you already have a ToastContainer in App.jsx, remove this one */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-md mx-auto p-5 text-white rounded-lg mt-5 bg-blue-950">
        <div className="text-center mt-5 mb-4">
          <h1 className="font-bold text-xl">Login</h1>
          <p>Enter Your Email and Password</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full p-2 mt-1 rounded-lg text-white"
              required
            />
          </div>

          <div className="mb-2">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full p-2 mt-1 rounded-lg text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-fuchsia-900 w-full p-2 rounded-lg mt-5 font-semibold">
            Login
          </button>

          <div className="text-center mt-3">
            <Link to="/register" className="text-blue-300 underline">
              New User? Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
