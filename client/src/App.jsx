import "./App.css";
import AllJobs from "./pages/AllJobs";
import JobDetails from "./pages/JobDetails";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import EmployeeRegister from "./pages/Auth/EmployeeRegister";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import Toaster
import CompaniesForm from "./pages/Admin/CompaniesForm";
import Companies from "./pages/Admin/Companies";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import JobPost from "./pages/Admin/JobPost";
import Dashbord from "./pages/Admin/Dashbord";
import Profile from "./pages/Profile";
import EditCompany from "./pages/Admin/EditCompany";
import JobPostForm from "./pages/Admin/JobPostForm";
import JobEditFrom from "./pages/Admin/JobEditFrom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <AllJobs />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
      },
      {
        path:"/user/profile",
        element:<Profile/>
      },
      // admin routes
       {
        path:"/admin/company",
        element:<Companies/>
      },  
      {
        path:"/admin/company/new",
        element:<CompaniesForm/>
      },
      {
        path:"/admin/company/edit/:id",
        element:<EditCompany/>
      },        
      {
        path:"/admin/job",
        element:<JobPost/>
      },
      {
        path:"/admin/jobs/new",
        element:<JobPostForm/>
      },
      {
        path:"/admin/jobs/edit/:id",
        element:<JobEditFrom/>
      },
      {
        path:"/admin/dashbord",
        element:<Dashbord/>
      }
    ],
  },
  // auth
  { path: "/register", element: <Register /> },
  { path: "/employee/register", element: <EmployeeRegister /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={true} />
    </>
  );
}

export default App;
