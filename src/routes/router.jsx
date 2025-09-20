import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "../guards/PrivateRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import StudentHome from "../pages/student/StudentHome";
import Exams from "../pages/student/Exams";
import Profile from "../pages/student/Profile";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";

import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import Reports from "../pages/superadmin/Reports";

const router = createBrowserRouter([
  // Auth area
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // App area
  {
    element: <AppLayout />,
    children: [
      // Student
      {
        index: true,
        element: (
          <PrivateRoute allow={["student", "admin", "superadmin"]}>
            <StudentHome />
          </PrivateRoute>
        ),
      },
      {
        path: "lessons",
        element: (
          <PrivateRoute allow={["student", "admin", "superadmin"]}>
            <StudentHome />
          </PrivateRoute>
        ),
      },
      {
        path: "exams",
        element: (
          <PrivateRoute allow={["student", "admin", "superadmin"]}>
            <Exams />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute allow={["student"]}>
            <Profile />
          </PrivateRoute>
        ),
      },

      // Admin
      {
        path: "dashboard",
        element: (
          <PrivateRoute allow={["admin", "superadmin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute allow={["admin", "superadmin"]}>
            <Users />
          </PrivateRoute>
        ),
      },

      // Super Admin
      {
        path: "admins",
        element: (
          <PrivateRoute allow={["superadmin"]}>
            <SuperAdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <PrivateRoute allow={["superadmin"]}>
            <Reports />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
