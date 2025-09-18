import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('https://edu-master-delta.vercel.app/auth/signup',{ fullName, email, phoneNumber, classLevel, password, cpassword } );

      console.log("Full response:", response.data);

      if (response.data.success) {
        toast.success(response.data.message || "Registration Successful");
        localStorage.setItem("user", JSON.stringify(response.data.data));

        
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response.data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className='bg-gray-500 min-h-screen p-5'>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='w-100 m-auto text-center p-5 text-white rounded-lg mt-5 bg-blue-950'>
        <h1 className='my-2 font-medium'>Register New account</h1>
        <form onSubmit={onSubmit}>
          <div className='mb-5'>
            <label className='font-semibold'>Full Name</label><br />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Enter Your Full Name'
              className='bg-white w-full p-2 rounded-lg outline-0 text-black'
            />
          </div>
          <div className='mb-5'>
            <label className='font-semibold'>Email</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              className='bg-white w-full p-2 rounded-lg outline-0 text-black'
            />
          </div>
          <div className='mb-5'>
            <label className='font-semibold'>Phone Number</label><br />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Enter Your Phone Number'
              className='bg-white w-full p-2 rounded-lg outline-0 text-black'
            />
          </div>
          <div className='mb-5'>
            <label className='font-semibold'>Class Level</label><br />
            <input
              type="text"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              placeholder='Enter Your Class Level'
              className='bg-white w-full p-2 rounded-lg outline-0 text-black'
            />
          </div>
          <div className='mb-5'>
            <label className='font-semibold'>Password</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='bg-white w-full p-2 rounded-lg outline-0 text-black'
            />
          </div>
          <div className='mb-5'>
            <label className='font-semibold'>Confirm Password</label><br />
            <input
              type="password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              placeholder='Confirm Your Password'
              className='bg-white w-full p-2 rounded-lg outline-0 text-black'
            />
          </div>
          <button type='submit' className='bg-green-900 w-full p-2 rounded-lg mt-5 font-semibold'>Register</button>
          <Link to="/login" className='text-blue-300 mt-3 block '>Already have an account? Login Here</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
