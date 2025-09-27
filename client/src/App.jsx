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
    ],
  },
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
