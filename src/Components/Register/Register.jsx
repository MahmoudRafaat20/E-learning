import React, { useState, useContext } from "react";

import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await register(fullName, email, phoneNumber, classLevel, password, cpassword);
    if (result.success) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="bg-gray-500 min-h-screen p-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-100 m-auto text-center p-5 text-white rounded-lg mt-5 bg-blue-950">
        <h1 className="my-2 font-medium">Register New account</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-5">
            <label className="font-semibold">Full Name</label><br />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter Your Full Name"
              className="bg-white w-full p-2 rounded-lg outline-0 text-black"
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Email</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="bg-white w-full p-2 rounded-lg outline-0 text-black"
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Phone Number</label><br />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Your Phone Number"
              className="bg-white w-full p-2 rounded-lg outline-0 text-black"
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Class Level</label><br />
            <input
              type="text"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              placeholder="Enter Your Class Level"
              className="bg-white w-full p-2 rounded-lg outline-0 text-black"
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Password</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="bg-white w-full p-2 rounded-lg outline-0 text-black"
            />
          </div>
          <div className="mb-5">
            <label className="font-semibold">Confirm Password</label><br />
            <input
              type="password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              placeholder="Confirm Your Password"
              className="bg-white w-full p-2 rounded-lg outline-0 text-black"
            />
          </div>
          <button type="submit" className="bg-green-900 w-full p-2 rounded-lg mt-5 font-semibold">
            Register
          </button>
          <Link to="/login" className="text-blue-300 mt-3 block">
            Already have an account? Login Here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
