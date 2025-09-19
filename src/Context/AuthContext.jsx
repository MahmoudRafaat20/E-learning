import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //  Register
  const register = async (fullName, email, phoneNumber, classLevel, password, cpassword) => {
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return { success: false };
    }

    try {
      const response = await axios.post(
        "https://edu-master-delta.vercel.app/auth/signup",
        { fullName, email, phoneNumber, classLevel, password, cpassword }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Registration Successful");
       
        localStorage.setItem("user", JSON.stringify(response.data.token));
        setUser({ token: response.data.token, email });
       
        
        return { success: true };
      } else {
        toast.error(response.data.message || "Registration Failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration Failed");
      return { success: false };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://edu-master-delta.vercel.app/auth/login",
        { email, password }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Login Successful");
        const userData = { token: response.data.token, email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        toast.error(response.data.message || "Login Failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login Failed");
      return { success: false };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
