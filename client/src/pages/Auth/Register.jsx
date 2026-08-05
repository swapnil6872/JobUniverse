import { Link } from "react-router-dom";
import GoogleBtn from "../../components/GoogleBtn";
import HrOr from "../../components/HrOr";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Login from "./Login";
import { USER_API_END_POINT } from "../../utils/Host";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/auth/authSlice';

function Register() {

  const [loginOpen, setLoginOpen] = useState(false);

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        withCredentials: true, // Ensures Passport.js session cookie is stored
      });
      console.log(res.data);
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="h-[64px] sm:h-[72px] w-full shadow-md bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h5 className="text-lg sm:text-xl font-semibold">
              <span className="text-[#00A5EC]">Job</span>Universe
            </h5>
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <div className="flex flex-col items-center flex-1 px-4 py-6 sm:py-10">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-3 sm:mb-4 text-zinc-800 text-center">
          Sign Up and Apply for Free
        </h1>

        <img
          src="../src/assets/img/underline_d.svg"
          alt=""
          className="mb-4 sm:mb-6 w-24 sm:w-32 md:w-48"
        />

        {/* Card */}
        <div className="w-full max-w-md bg-white p-4 sm:p-6 border border-gray-200 rounded-lg shadow-sm">
          <GoogleBtn style={"h-12 sm:h-13 w-full"} />
          <HrOr />

          <form className="space-y-3 sm:space-y-4" onSubmit={submitHandler} >
            {/* Hidden Role */}
            <input className="hidden" type="text" name="role" value={input.role} required onChange={changeEventHandler} />
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm text-gray-600"
              >
                Username
              </label>
              <TextField
                label="Johndoe Stark"
                variant="outlined"
                fullWidth
                id="username"
                InputProps={{
                  sx: {
                    height: "48px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  },
                }}
                name="username"
                value={input.username}
                onChange={changeEventHandler}
                required
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
                label="johndoe@example.com"
                variant="outlined"
                fullWidth
                id="email"
                InputProps={{
                  sx: {
                    height: "48px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  },
                }}
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                required
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
                label="Must be at least 6 characters"
                variant="outlined"
                fullWidth
                type="password"
                id="password"
                InputProps={{
                  sx: {
                    height: "48px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                  },
                }}
                autoComplete="true"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                required
              />
            </div>
            <span style={{ display: "none" }}>
              <input type="text" name="role" value={"recruiter"} onChange={changeEventHandler} required />
            </span>



            {/* Button */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              className="bg-[#00A5EC] hover:bg-[#0A66C2] text-white h-11 sm:h-12 normal-case"
            >
              Sign Up
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs sm:text-sm text-gray-600 text-center mt-5 sm:mt-6 px-2">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-[#00A5EC] hover:underline">
              Terms and Conditions
            </Link>
            .
          </p>

          {/* Already registered */}
          <p className="text-center mt-4 text-sm">
            Already registered?{" "}
            <button
              onClick={() => setLoginOpen(true)}
              className="text-[#00A5EC]  border-[#00A5EC]  py-1 rounded-md font-medium "
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

export default Register;