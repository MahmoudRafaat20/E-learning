import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function tryExtractRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1] || ""));
    return payload?.role || "student";
  } catch {
    return "student";
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("student");
  const [classLevel, setClassLevel] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

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
        setClassLevel(parsed.classLevel || null);
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

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
          headers: { token: user.token },
        }
      );

      console.log("User Profile Response:", response.data);

      if (response.data.success && response.data.user) {
        const userProfile = response.data.user;
        const updatedUser = {
          ...user,
          classLevel: userProfile.classLevel,
          fullName: userProfile.fullName,
          phoneNumber: userProfile.phoneNumber,
          userId: userProfile._id, // إضافة userId إذا كان متوفراً
        };

        setUser(updatedUser);
        setClassLevel(userProfile.classLevel);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return userProfile;
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

      if (data.success) {
        toast.success("Registration successful");

        const userData = {
          token: data.token,
          email,
          classLevel,
          role: tryExtractRoleFromToken(data.token),
        };

        setUser(userData);
        setRole(userData.role || "student");
        setClassLevel(classLevel);
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true };
      } else {
        toast.error(data.message || "Registration failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
      return { success: false };
    }
  };

  // وتعديل دالة login لإضافة await قبل fetchUserProfile
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://edu-master-psi.vercel.app/auth/login",
        { email, password }
      );
    
       
      if (data.success) {
        toast.success("Login successful");

        const userData = {
          token: data.token,
          email,
          role: tryExtractRoleFromToken(data.token),
        };

        setUser(userData);
        setRole(userData.role || "student");
        localStorage.setItem("user", JSON.stringify(userData));

        // الانتظار حتى ينتهي جلب ال profile
        await fetchUserProfile();

        return { success: true };
      } else {
        toast.error(data.message || "Login failed");
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
