// Central place to define links shown by role
export const TOP_NAV = {
  student: [
    { to: "/student/lessons", label: "Lessons" },
    { to: "/student/exams", label: "Exams" },
    { to: "/student/profile", label: "Profile" },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/lessons", label: "Lessons" },
    { to: "/admin/exams", label: "Exams" },
    { to: "/admin/questions", label: "Questions" },
    { to: "/admin/allusers", label: "All Users" },
  ],
  superadmin: [
    { to: "/superadmin/dashboard", label: "Dashboard" },
    { to: "/superadmin/lessons", label: "Lessons" },
    { to: "/superadmin/exams", label: "Exams" },
    { to: "/superadmin/questions", label: "Questions" },
    { to: "/superadmin/reports", label: "Reports" },
    { to: "/superadmin/alladmins", label: "All Admins" },
  ],
};

export const SIDE_NAV = {
  student: [
    { to: "/student/lessons", label: "Lessons" },
    { to: "/student/exams", label: "Exams" },
    { to: "/student/profile", label: "Profile" },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Overview" },
    { to: "/admin/allusers", label: "All Users" },
    { to: "/admin/lessons", label: "Lessons" },
    { to: "/admin/exams", label: "Exams" },
    { to: "/admin/questions", label: "Questions" },
  ],
  superadmin: [
    { to: "/superadmin/dashboard", label: "Overview" },
    { to: "/superadmin/alladmins", label: "Manage Admins" },
    { to: "/superadmin/reports", label: "Reports" },
    { to: "/superadmin/lessons", label: "Lessons" },
    { to: "/superadmin/exams", label: "Exams" },
    { to: "/superadmin/questions", label: "Questions" },
  ],
};
