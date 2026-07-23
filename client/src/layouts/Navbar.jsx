// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { Search } from "lucide-react";
// import { useState } from "react";
// import PopoverUser from "../components/PopoverUser";
// import Login from "../pages/Auth/Login";
// import { useSelector } from "react-redux";

// function Navbar() {
//   const [loginOpen, setLoginOpen] = useState(false);

//   const user = useSelector((state) => state.auth.user);
//   // const user = {username:"swapnil",role:"recruiter"}

//   return (
//     <nav className="h-[72px] w-full shadow-md bg-white text-black">
//       <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
//         {/* Logo + Links */}
//         <div className="flex items-center gap-10 flex-1">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <h5 className="text-xl font-semibold">
//               <span className="text-[#00A5EC]">Job</span>Universe
//             </h5>
//           </Link>

//           {/* Links */}

//           { user && user.role === 'recruiter' ? (<> 

//             <NavLink
//               to="/admin/company"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-[#00A5EC] font-semibold"
//                   : "hover:text-[#00A5EC]"
//               }
//             >
//               Company <i className="fa-solid fa-caret-down"></i>
//             </NavLink>
//                         <NavLink
//               to="/admin/job"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-[#00A5EC] font-semibold"
//                   : "hover:text-[#00A5EC]"
//               }
//             >
//               Post Job/Internship <i className="fa-solid fa-caret-down"></i>
//             </NavLink>
//                    <NavLink
//               to="/admin/dashbord"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-[#00A5EC] font-semibold"
//                   : "hover:text-[#00A5EC]"
//               }
//             >
//               Dashbord <i className="fa-solid fa-caret-down"></i>
//             </NavLink>
          
//           </> ): ( <> 

//           <div className="hidden lg:flex gap-8 items-center">
//             <NavLink
//               to="/jobs"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-[#00A5EC] font-semibold"
//                   : "hover:text-[#00A5EC]"
//               }
//             >
//               Jobs <i className="fa-solid fa-caret-down"></i>
//             </NavLink>
//             {/* <NavLink
//               to=""
//               className={({ isActive }) =>
//                 isActive ? "text-[#00A5EC] font-semibold" : "hover:text-[#00A5EC]"
//               }
//             >
//               Internships
//             </NavLink> */}
//             <span className="hover:text-gray-400 cursor-not-allowed relative group">
//               Internships
//               <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                 ComingSoon
//               </span>
//             </span>
// {/* 
//             <NavLink
//               to=""
//               className={"cursor-not-allowed group"}
//               // className={(
//               //   { isActive }) =>
//               //   isActive ? "text-[#00A5EC] font-semibold" : "hover:text-[#00A5EC] "
//               // }
//             >
//               Courses
//               <span className="text-gray-400 opacity-0 group-hover:opacity-200 hidden">
//                 {" "}
//                 (Coming Soon)
//               </span>
//             </NavLink> */}

//             <span className="hover:text-gray-400 cursor-not-allowed relative group">
//               Courses
//               <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                 ComingSoon
//               </span>
//             </span>
//           </div>

//           </> )}

//         </div> 
       
//         {/* Right Section */}
//         <div className="flex items-center gap-6">
//           {/* Search */}
//           <button
//             aria-label="Search"
//             className="flex items-center border border-gray-300 rounded-2xl px-3 py-1 text-gray-700 hover:bg-gray-100"
//           >
//             <Search className="w-4 mr-1" /> Search
//           </button>

//           {/* Divider */}
//           <span className="hidden md:block w-px h-6 bg-gray-300" />

//           {/* Auth */}

//           {!user ? (
//             <>
//               <button
//                 onClick={() => setLoginOpen(true)}
//                 className="hover:text-[#00A5EC] text-[#00A5EC] border border-[#00A5EC] px-4.5 py-0.5 rounded-md font-[500] cursor-pointer"
//               >
//                 Login
//               </button>

//               <Link
//                 to="/register"
//                 className="hover: btn text-white rounded-md bg-[#00A5EC] border border-[#00A5EC] px-3 py-0.5"
//               >
//                 Register
//               </Link>

//               {/* Divider */}
//               <span className="hidden md:block w-px h-6 bg-gray-300" />

//               {/* Employers */}
//               <Link
//                 to="/employee/register"
//                 className="relative text-sm font-medium text-[#00A5EC] 
//              after:content-[''] after:absolute after:w-0 after:h-[1px] after:left-0 after:-bottom-1 
//              after:bg-[#00A5EC] after:transition-all after:duration-300 
//              hover:after:w-full"
//               >
//                 For employers &gt;
//               </Link>
//             </>
//           ) : (
//             <>
//               <PopoverUser user={user} />{" "}
//             </>
//           )}
//         </div>
//       </div>
//       {/* Login Modal */}
//       <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import PopoverUser from "../components/PopoverUser";
import Login from "../pages/Auth/Login";
import { useSelector } from "react-redux";

function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  // const user = {username:"swapnil",role:"user"}

  return (
    <nav className="w-full shadow-md bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-[72px]">
        {/* Logo + Links */}
        <div className="flex items-center flex-1">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h5 className="text-xl font-semibold">
              <span className="text-[#00A5EC]">Job</span>Universe
            </h5>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 items-center ml-10">
            {user && user.role === "recruiter" ? (
              <>
                <NavLink
                  to="/admin/company"
                  className={({ isActive }) =>
                    isActive ? "text-[#00A5EC] font-semibold" : "hover:text-[#00A5EC]"
                  }
                >
                  Company <i className="fa-solid fa-caret-down"></i>
                </NavLink>
                <NavLink
                  to="/admin/job"
                  className={({ isActive }) =>
                    isActive ? "text-[#00A5EC] font-semibold" : "hover:text-[#00A5EC]"
                  }
                >
                  Post Job/Internship <i className="fa-solid fa-caret-down"></i>
                </NavLink>
                <NavLink
                  to="/admin/dashbord"
                  className={({ isActive }) =>
                    isActive ? "text-[#00A5EC] font-semibold" : "hover:text-[#00A5EC]"
                  }
                >
                  Dashbord <i className="fa-solid fa-caret-down"></i>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    isActive ? "text-[#00A5EC] font-semibold" : "hover:text-[#00A5EC]"
                  }
                >
                  Jobs <i className="fa-solid fa-caret-down"></i>
                </NavLink>
                <span className="hover:text-gray-400 cursor-not-allowed relative group">
                  Internships
                  <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ComingSoon
                  </span>
                </span>
                <span className="hover:text-gray-400 cursor-not-allowed relative group">
                  Courses
                  <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ComingSoon
                  </span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            aria-label="Search"
            className="hidden sm:flex items-center border border-gray-300 rounded-2xl px-3 py-1 text-gray-700 hover:bg-gray-100"
          >
            <Search className="w-4 mr-1" /> Search
          </button>

          {/* Auth */}
          <div className="hidden lg:flex items-center gap-2">
            {!user ? (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="hover:text-[#00A5EC] text-[#00A5EC] border border-[#00A5EC] px-4 py-1 rounded-md font-[500] cursor-pointer"
                >
                  Login
                </button>

                <Link
                  to="/register"
                  className="text-white rounded-md bg-[#00A5EC] border border-[#00A5EC] px-4 py-1 hover:bg-[#0090d4]"
                >
                  Register
                </Link>

                {/* Employers */}
                <Link
                  to="/employee/register"
                  className="relative text-sm font-medium text-[#00A5EC] 
               after:content-[''] after:absolute after:w-0 after:h-[1px] after:left-0 after:-bottom-1 
               after:bg-[#00A5EC] after:transition-all after:duration-300 
               hover:after:w-full"
                >
                  For employers &gt;
                </Link>
              </>
            ) : (
              <PopoverUser user={user} /> 
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pb-4 animate-slideDown">
          <div className="flex flex-col gap-3 mt-3">
            {user && user.role === "recruiter" ? (
              <>
                <NavLink
                  to="/admin/company"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-[#00A5EC] hover:bg-gray-100 rounded"
                >
                  Company
                </NavLink>
                <NavLink
                  to="/admin/job"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-[#00A5EC] hover:bg-gray-100 rounded"
                >
                  Post Job/Internship
                </NavLink>
                <NavLink
                  to="/admin/dashbord"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-[#00A5EC] hover:bg-gray-100 rounded"
                >
                  Dashboard
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/jobs"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-[#00A5EC] hover:bg-gray-100 rounded"
                >
                  Jobs
                </NavLink>
                <span className="block py-2 text-gray-500 cursor-not-allowed">
                  Internships (Coming Soon)
                </span>
                <span className="block py-2 text-gray-500 cursor-not-allowed">
                  Courses (Coming Soon)
                </span>
              </>
            )}

            {/* Auth buttons in mobile */}
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full border border-[#00A5EC] text-[#00A5EC] py-2 rounded-md hover:bg-[#00A5EC] hover:text-white transition"
                >
                  Login
                </button>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center bg-[#00A5EC] text-white py-2 rounded-md border border-[#00A5EC] hover:bg-[#0090d4] transition"
                >
                  Register
                </Link>

                <Link
                  to="/employee/register"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center border border-[#00A5EC] text-[#00A5EC] py-2 rounded-md hover:bg-[#00A5EC] hover:text-white transition"
                >
                  For Employers &gt;
                </Link>
              </>
            ) : (
              <PopoverUser user={user} />
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </nav>
  );
}

export default Navbar;
