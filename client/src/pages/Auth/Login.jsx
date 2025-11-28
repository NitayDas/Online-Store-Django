// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosInstance from "../../components/AxiosInstance";
import { useUser } from "../../Provider/UserProvider";

const Login = () => {
  const { refreshUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      alert("Username and password are required!");
      return;
    }

    try {
      const response = await AxiosInstance.post("login/", credentials);
      const { access } = response.data;
      localStorage.setItem("access_token", access);

      // Refresh user context if function exists
      refreshUser?.();

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) alert("Invalid username or password!");
        else if (status === 400) alert("Please provide both username and password.");
        else alert(error.response.data?.message || "Something went wrong!");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="w-80 md:w-96 lg:w-[500px] mx-auto my-16 bg-white shadow-xl flex items-center overflow-hidden">
      <form onSubmit={handleLogin} className="p-8 w-full">
        <h1 className="text-2xl lg:text-4xl font-bold pb-4">Login</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-600">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-3 border rounded-md outline-none border-black"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full p-3 border rounded-md outline-none border-black"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 px-5 rounded-md border border-black shadow-lg hover:bg-green-700 hover:text-white transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
