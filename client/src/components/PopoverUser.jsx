import * as React from 'react';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

import { logout } from '../features/auth/authSlice';
import { USER_API_END_POINT } from '../utils/Host';

export default function PopoverUser({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleClose(); // Close popover immediately
      // Clear Passport.js session on backend
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Backend logout error:", err);
    } finally {
      // Purge local auth state and navigate home
      dispatch(logout());
      toast.success("User logged out successfully");
      navigate("/", { replace: true });
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  return (
    <div className="ml-[-10px]">
      <Button aria-describedby={id} onClick={handleClick} className="p-0">
        <Avatar alt={user?.username || "User"} src="/static/images/avatar/1.jpg" />
        &nbsp;
        <p className="lg:hidden text-sm font-medium text-gray-700">
          {user?.username}
        </p>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          className:
            "rounded-xl shadow-lg w-72 overflow-hidden border border-gray-200",
        }}
      >
        {/* Top Section */}
        <div className="p-4">
          <p className="font-semibold text-gray-900">
            {user?.username
              ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
              : "User"}
          </p>
          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
        </div>
        <hr />

        {/* Rating Section */}
        <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">4.1</span>
          </div>
          <span className="text-xs text-blue-600 flex items-center gap-1">
            <Link to="/know-more">Know More</Link>
            <ChevronRight size={14} />
          </span>
        </div>
        <hr />

        {/* Menu Links */}
        <div className="py-1">
          <Link
            to="/user/profile"
            onClick={handleClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Profile
          </Link>
          <Link
            to="/user/applications"
            onClick={handleClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            My Applications
          </Link>
          {/* <Link
            // to="/bookmarks"
            onClick={handleClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:z-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            My Bookmarks
          </Link> */}
          <span
            className="flex items-center justify-between px-3 sm:px-4 py-2 text-sm text-gray-400 cursor-not-allowed select-none"
            aria-disabled="true"
          >
            <span className="truncate">My Bookmarks</span>

            <span className="ml-2 shrink-0 rounded bg-gray-100 px-2 py-0.5 text-[10px] sm:text-xs text-gray-500">
              Soon
            </span>
          </span>
          {/* <Link
            to="/resume"
            onClick={handleClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Edit Resume
          </Link> */}
          <span
            className="flex items-center justify-between px-3 sm:px-4 py-2 text-sm text-gray-400 cursor-not-allowed select-none"
            aria-disabled="true"
          >
            <span className="truncate">Edit Resume</span>

            <span className="ml-2 shrink-0 rounded bg-gray-100 px-2 py-0.5 text-[10px] sm:text-xs text-gray-500">
              Soon
            </span>
          </span>
          {/* <Link
            to="/preferences"
            onClick={handleClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Edit Preferences
          </Link> */}
          <span
            className="flex items-center justify-between px-3 sm:px-4 py-2 text-sm text-gray-400 cursor-not-allowed select-none"
            aria-disabled="true"
          >
            <span className="truncate">Edit Preferences</span>

            <span className="ml-2 shrink-0 rounded bg-gray-100 px-2 py-0.5 text-[10px] sm:text-xs text-gray-500">
              Soon
            </span>
          </span>
          <Link
            to="/safety-tips"
            onClick={handleClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Safety Tips
          </Link>
          <Link
            to="/help-center"
            onClick={handleClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Help Center
          </Link>
        </div>
        <hr />

        {/* More Dropdown */}
        <div className="px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <span>More</span>
          <ChevronDown size={16} />
        </div>
        <Link
          to="/user/account"
          onClick={handleClose}
          className="block px-4 py-2 text-sm pl-6 text-gray-700 hover:bg-gray-50"
        >
          Manage Account
        </Link>
        <hr />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-rose-600 font-medium hover:bg-rose-50 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </Popover>
    </div>
  );
}
