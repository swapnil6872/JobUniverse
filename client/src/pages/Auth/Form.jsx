import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/Host";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { toast } from "react-hot-toast";

function Form({ onClose }) {
  const { active, user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: active === 0 ? "user" : "recruiter",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      role: active === 0 ? "user" : "recruiter",
    }));
  }, [active]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Redux action updates state + localStorage automatically
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Logged in successfully!");

        if (onClose) onClose(true);
        navigate(location.pathname !== "/login" ? location.pathname : "/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          className="hidden"
          type="text"
          name="role"
          value={input.role}
          onChange={changeEventHandler}
        />
        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
            Email
          </label>
          <TextField
            placeholder="johndoe@example.com"
            variant="outlined"
            fullWidth
            className="!mb-4"
            id="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            InputProps={{
              sx: {
                height: "48px",
                borderRadius: "4px",
                fontSize: "0.875rem",
              },
            }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm text-gray-600">
            Password
          </label>
          <TextField
            placeholder="Must be at least 6 characters"
            variant="outlined"
            fullWidth
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            InputProps={{
              sx: {
                height: "48px",
                borderRadius: "4px",
                fontSize: "0.875rem",
              },
            }}
          />
        </div>

        <div>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline float-right py-4"
          >
            Forgot Password?
          </Link>
        </div>

        <div>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            className="bg-[#00A5EC] hover:bg-[#0A66C2] normal-case text-white h-10"
          >
            Login
          </Button>
        </div>
      </form>

      <div className="text-center mt-4 text-sm text-gray-600">
        <p>
          New to JobUniverse? Register{" "}
          <Link to="/register" className="text-blue-600">
            ( Sign Up
          </Link>
          /{" "}
          <Link to="/employee/register" className="text-blue-600">
            Company )
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Form;