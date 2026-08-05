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
import Profile from "./pages/User/Profile";
import EditCompany from "./pages/Admin/EditCompany";
import JobPostForm from "./pages/Admin/JobPostForm";
import JobEditFrom from "./pages/Admin/JobEditFrom";
import JobApplications from "./pages/Admin/JobApplications";
import UserApplications from "./pages/User/UserApplication";
import ProfileEdit from "./pages/User/ProfileEdit";
import ManageAccount from "./pages/User/ManageAccount";
import HelpCenter from "./pages/Extra/HelpCenter";
import SafetyTips from "./pages/Extra/SafetyTips";
import TermsAndConditions from "./pages/Extra/TermsAndConditions";
import KnowMore from "./pages/Extra/KnowMore";


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
      {
        path:"/user/profile/edit",
        element:<ProfileEdit/>
      },
      {
        path:"/user/applications",
        element:<UserApplications/>
      },
      {
        path:"/user/account",
        element:<ManageAccount/>
      },
      {
        path:"/help-center",
        element:<HelpCenter/>
      },
      {
        path:"/safety-tips",
        element:<SafetyTips/>
      },
      {
        path:"/terms-and-conditions",
        element:<TermsAndConditions/>
      },
      {
        path:"/know-more",
        element:<KnowMore/>
      },

      // admin routes
      {
        path:"/admin/company",
        element: <ProtectedRoute> <Companies/> </ProtectedRoute>
      },  
      {
        path:"/admin/company/new",
        element: <ProtectedRoute><CompaniesForm/></ProtectedRoute>
      },
      {
        path:"/admin/company/edit/:id",
        element:<ProtectedRoute><EditCompany/></ProtectedRoute>
      },        
      {
        path:"/admin/job",
        element:<ProtectedRoute><JobPost/></ProtectedRoute>
      },
      {
        path:"/admin/job/applications/:id",
        element:<ProtectedRoute><JobApplications/></ProtectedRoute>
      },
      {
        path:"/admin/jobs/new",
        element:<ProtectedRoute><JobPostForm/></ProtectedRoute>
      },
      {
        path:"/admin/jobs/edit/:id",
        element:<ProtectedRoute><JobEditFrom/></ProtectedRoute>
      },
      {
        path:"/admin/dashbord",
        element:<ProtectedRoute><Dashbord/></ProtectedRoute>
      },
      {
      
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
