import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Map API role strings to the app's internal keys used by router/nav
const normalizeRole = (r) => {
  const role = String(r || "")
    .toLowerCase()
    .trim();
  if (["superadmin", "super-admin", "super_admin"].includes(role))
    return "superadmin";
  if (["admin"].includes(role)) return "admin";
  return "student";
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { token, email, role, ... }
  const [role, setRole] = useState("student"); // "student" | "admin" | "superadmin"
  const [classLevel, setClassLevel] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.token) {
        const normalized = normalizeRole(parsed.role);
        const merged = { ...parsed, role: normalized };
        setUser(merged);
        setRole(normalized);
        setClassLevel(merged.classLevel || null);

        // Ensure axios header if token exists
        axios.defaults.headers.common.Authorization = `Bearer ${merged.token}`;
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  // Keep axios Authorization header in sync
  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [user?.token]);

  const fetchUserProfile = async () => {
    if (!user?.token) return null;

    try {
      setProfileLoading(true);
      const response = await axios.get(
        "https://edu-master-psi.vercel.app/user/",
        {
          // Keep both headers in case backend expects `token`
          headers: { token: user.token },
        }
      );

      if (response.data?.success && response.data.user) {
        const p = response.data.user;

        // Merge into current user object
        const updated = {
          ...user,
          classLevel: p.classLevel ?? user.classLevel,
          fullName: p.fullName ?? user.fullName,
          phoneNumber: p.phoneNumber ?? user.phoneNumber,
          userId: p._id ?? user.userId,
        };

        // If backend ever returns role here, normalize & apply
        if (p.role) {
          const normalized = normalizeRole(p.role);
          updated.role = normalized;
          setRole(normalized);
        }

        setUser(updated);
        setClassLevel(updated.classLevel ?? null);
        localStorage.setItem("user", JSON.stringify(updated));
        return p;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user data");
      return null;
    } finally {
      setProfileLoading(false);
    }
  };

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

      if (data?.success) {
        toast.success("Registration successful");

        // Some backends don't return role on signup; default to student if missing
        const normalized = normalizeRole(data.role || "student");

        const userData = {
          token: data.token,
          email,
          classLevel,
          role: normalized,
        };

        setUser(userData);
        setRole(normalized);
        setClassLevel(classLevel);
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      } else {
        toast.error(data?.message || "Registration failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
      return { success: false };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://edu-master-psi.vercel.app/auth/login",
        { email, password }
      );
      // Example response:
      // { message, success: true, token, role: "super-admin" }

      if (data?.success) {
        toast.success("Login successful");

        const normalized = normalizeRole(data.role);
        const userData = {
          token: data.token,
          email,
          role: normalized, // Save the normalized role directly
        };

        setUser(userData);
        setRole(normalized);
        localStorage.setItem("user", JSON.stringify(userData));

        // Fetch profile details (classLevel, phone, etc.)
        await fetchUserProfile();

        return { success: true };
      } else {
        toast.error(data?.message || "Login failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    setRole("student");
    setClassLevel(null);
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  const value = {
    user,
    role,
    classLevel,
    isAuthenticated: !!user?.token,
    profileLoading,
    fetchUserProfile,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
