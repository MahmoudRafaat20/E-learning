// Central place to define links shown by role
export const TOP_NAV = {
  student: [
    { to: "/lessons", label: "Lessons" },
    { to: "/exams", label: "Exams" },
    { to: "/profile", label: "Profile" },
  ],
  admin: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/users", label: "Users" },
  ],
  superadmin: [
    { to: "/admins", label: "Admins" },
    { to: "/reports", label: "Reports" },
  ],
};

export const SIDE_NAV = {
  student: [
    { to: "/lessons", label: "Lessons" },
    { to: "/exams", label: "Exams" },
    { to: "/profile", label: "Profile" },
  ],
  admin: [
    { to: "/dashboard", label: "Overview" },
    { to: "/users", label: "Users" },
    { to: "/lessons", label: "Lessons" },
    { to: "/exams", label: "Exams" },
  ],
  superadmin: [
    { to: "/admins", label: "Manage Admins" },
    { to: "/reports", label: "Reports" },
    { to: "/lessons", label: "Lessons" },
  ],
};
