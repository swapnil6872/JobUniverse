import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Login from "./Login";
import { USER_API_END_POINT } from "../../utils/Host";
import { setUser, setLoading } from "../../features/auth/authSlice";

function EmployeeRegister() {
  const [loginOpen, setLoginOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "recruiter",
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.username.trim() || !input.email.trim() || !input.password.trim()) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        withCredentials: true, // Ensures Passport.js session cookie is stored
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Registered successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="h-[72px] w-full shadow-md bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h5 className="text-xl font-semibold">
              <span className="text-[#00A5EC]">Job</span>Universe
            </h5>
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <div className="flex flex-col items-center flex-1 px-4 py-10">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-zinc-800 text-center">
          Sign Up to Hire Talent
        </h1>

        <div className="w-full max-w-md bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
          <form className="space-y-4" onSubmit={submitHandler}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm text-gray-600"
              >
                Username
              </label>
              <TextField
                placeholder="Johndoe Stark"
                variant="outlined"
                fullWidth
                id="username"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                InputProps={{
                  sx: {
                    height: "48px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm text-gray-600"
              >
                Email
              </label>
              <TextField
                placeholder="johndoe@example.com"
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                // type="email"
                value={input.email}
                onChange={changeEventHandler}
                InputProps={{
                  sx: {
                    height: "48px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm text-gray-600"
              >
                Password
              </label>
              <TextField
                placeholder="Must be at least 6 characters"
                variant="outlined"
                fullWidth
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                value={input.password}
                onChange={changeEventHandler}
                InputProps={{
                  sx: {
                    height: "48px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  },
                }}
              />
            </div>

            {/* Hidden Role */}
            <input type="hidden" name="role" value={input.role} />

            {/* Button */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={loading}
              className="bg-[#00A5EC] hover:bg-[#0A66C2] text-white h-12 normal-case font-medium"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up as Recruiter"
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-sm text-gray-600 text-center mt-6">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-[#00A5EC] hover:underline">
              Terms and Conditions
            </Link>
            .
          </p>

          {/* Already registered */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="text-[#00A5EC] font-medium hover:underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}

export default EmployeeRegister;