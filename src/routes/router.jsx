import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "../guards/PrivateRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import StudentHome from "../pages/student/StudentHome";
import Exams from "../pages/student/Exams";
import Profile from "../pages/student/Profile";

import PaymentPage from "../pages/student/PaymentPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AllUsers from "../pages/admin/AllUsers";
import AdminLessons from "../pages/admin/AdminLessons";
import AdminExams from "../pages/admin/AdminExams";
import AdminQuestions from "../pages/admin/AdminQuestions";

import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import Reports from "../pages/superadmin/Reports";
import SuperLessons from "../pages/superadmin/SuperLessons";
import SuperExams from "../pages/superadmin/SuperExams";
import SuperQuestions from "../pages/superadmin/SuperQuestions";
import AllAdmins from "../pages/superadmin/AllAdmins";
import LessonsList from "../pages/student/LessonsList";


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
        path: "student",
        children: [
          {
            path: "lessons",
            element: (
              <PrivateRoute allow={["student", "admin", "superadmin"]}>
                <LessonsList />
              </PrivateRoute>
            ),
          },
          {
            path: "exams",
            element: (
              <PrivateRoute allow={["student"]}>
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
          {
            path: "lessons/payment/:lessonId",
            element: (
              <PrivateRoute allow={["student"]}>
                <PaymentPage />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "dashboard",
            element: (
              <PrivateRoute allow={["admin", "superadmin"]}>
                <AdminDashboard />
              </PrivateRoute>
            ),
          },
          {
            path: "lessons",
            element: (
              <PrivateRoute allow={[ "admin", "superadmin"]}>
                <AdminLessons />
              </PrivateRoute>
            ),
          },
          {
            path: "exams",
            element: (
              <PrivateRoute allow={["admin", "superadmin"]}>
                <AdminExams />
              </PrivateRoute>
            ),
          },
          {
            path: "questions",
            element: (
              <PrivateRoute allow={["admin", "superadmin"]}>
                <AdminQuestions />
              </PrivateRoute>
            ),
          },
          {
            path: "allusers",
            element: (
              <PrivateRoute allow={["admin", "superadmin"]}>
                {/* You can also use <Users /> here if that's already your list */}
                <AllUsers />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "superadmin",
        children: [
          {
            path: "dashboard",
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
          {
            path: "lessons",
            element: (
              <PrivateRoute allow={["superadmin"]}>
               <SuperLessons/>
              </PrivateRoute>
            ),
          },
          {
            path: "exams",
            element: (
              <PrivateRoute allow={["superadmin"]}>
                <SuperExams />
              </PrivateRoute>
            ),
          },
          {
            path: "questions",
            element: (
              <PrivateRoute allow={["superadmin"]}>
                <SuperQuestions />
              </PrivateRoute>
            ),
          },
          {
            path: "alladmins",
            element: (
              <PrivateRoute allow={["superadmin"]}>
                <AllAdmins />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
