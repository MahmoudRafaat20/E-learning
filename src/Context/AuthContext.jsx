import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// optional: decode role from token if your backend includes it later
function tryExtractRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1] || ""));
    return payload?.role || "student";
  } catch {
    return "student";
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { token, email }
  const [role, setRole] = useState("student"); // "student" | "admin" | "superadmin"

  // bootstrap from localStorage (supports your old shape too)
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.token) {
        setUser(parsed);
        setRole(
          parsed.role || tryExtractRoleFromToken(parsed.token) || "student"
        );
      } else if (typeof parsed === "string") {
        // legacy: stored just the token string
        const upgraded = { token: parsed, email: undefined };
        setUser(upgraded);
        setRole(tryExtractRoleFromToken(parsed));
        localStorage.setItem("user", JSON.stringify(upgraded));
      }
    } catch {
      // if something wrong, clear
      localStorage.removeItem("user");
    }
  }, []);

  // attach/detach token to axios
  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [user?.token]);

  // ----------------- Register -----------------
  const register = async (
    fullName,
    email,
    phoneNumber,
    classLevel,
    password,
    cpassword
  ) => {
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return { success: false };
    }
    try {
      const { data } = await axios.post(
        "https://edu-master-psi.vercel.app/auth/signup",
        { fullName, email, phoneNumber, classLevel, password, cpassword }
      );

      if (data.success) {
        toast.success(data.message || "Registration Successful");

        // normalize to one shape (token + email + role)
        const userData = {
          token: data.token,
          email,
          role: tryExtractRoleFromToken(data.token),
        };
        setUser(userData);
        setRole(userData.role || "student");
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      } else {
        toast.error(data.message || "Registration Failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration Failed");
      return { success: false };
    }
  };

  // ----------------- Login -----------------
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://edu-master-psi.vercel.app/auth/login",
        { email, password }
      );

      if (data.success) {
        toast.success(data.message || "Login Successful");

        const userData = {
          token: data.token,
          email,
          role: tryExtractRoleFromToken(data.token),
        };
        setUser(userData);
        setRole(userData.role || "student");
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      } else {
        toast.error(data.message || "Login Failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login Failed");
      return { success: false };
    }
  };

  // ----------------- Logout -----------------
  const logout = () => {
    setUser(null);
    setRole("student");
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  const value = {
    user,
    role,
    isAuthenticated: !!user?.token,
    setRole, // keep for now (lets you switch in UI until backend returns roles)
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
