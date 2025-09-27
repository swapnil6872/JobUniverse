// import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';

// export default function PopoverUser({user}) {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div>
//         <div className={open ? "bg-[#008BDC]/20" : "bg-transparent"}>
//         <Button aria-describedby={id}  onClick={handleClick}  >
//          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//       </Button>
//       </div>
//       <Popover
//         id={id}
//         sx={{ mt: 1.3 }}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//       >
//         <Typography sx={{ py: 2 }}>
           
//           <div className='px-4 space-y-1'>
//              <p className='font-bold'> {user.name}</p>
//              <p className='text-gray-500'>{user.email}</p>
//           </div>
//           <hr />
//           <div>
            
//           </div>
//         </Typography>

//       </Popover>
//     </div>
//   );
// }

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // if using React Router
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';

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

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} className="p-0">
        <Avatar alt={user.name} src="/static/images/avatar/1.jpg" />
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
          {/* <p className="font-semibold">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</p> */}
          <p className="font-semibold">
            {user?.username?.charAt(0).toUpperCase() +
              user?.username?.slice(1) || "User"}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <hr />

        {/* Rating Section */}
        <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">4.1</span>
          </div>
          <span className="text-xs text-blue-600 flex items-center gap-1">
            Know More <ChevronRight size={14} />
          </span>
        </div>
        <hr />

        {/* Menu Links */}
        <div className="py-1">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            View Profile
          </Link>
          <Link
            to="/applications"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            My Applications
          </Link>
          <Link
            to="/bookmarks"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            My Bookmarks
          </Link>
          <Link
            to="/resume"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            Edit Resume
          </Link>
          <Link
            to="/preferences"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            Edit Preferences
          </Link>
          <Link
            to="/safety"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            Safety Tips
          </Link>
          <Link to="/help" className="block px-4 py-2 text-sm hover:bg-gray-50">
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
          to="/account"
          className="block px-4 py-2 text-sm pl-6 hover:bg-gray-50"
        >
          Manage Account
        </Link>
        <hr />

        {/* Logout */}
        <button
          onClick={() => {
            dispatch(setUser(null));

            toast.success("user Logout sucessfully");
          }}
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
        >
          Logout
        </button>
      </Popover>
    </div>
  );
}

