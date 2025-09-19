import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://edu-master-delta.vercel.app/auth/login', { email, password });

            console.log("Full response:", response.data);
            if (response.data.success) {
                toast.success(response.data.message || "Login Successful");
                localStorage.setItem("user", JSON.stringify(response.data.token));

            } else {
                toast.error("Login Failed");
            }

        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className='bg-gray-500 min-h-screen p-5'>
        <ToastContainer position="top-right" autoClose={3000} />
            <div className='w-100 m-auto p-5 text-white rounded-lg mt-5 bg-blue-950'>
                <div className='text-center mt-5 mb-4'>
                    <h1 className='font-bold'>Login</h1>
                    <p>Enter Your Email and Password</p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className='text-center mb-5'>
                        <label className='font-semibold'>Email</label><br />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            className='w-full p-1 rounded-lg' />
                    </div>
                    <div className='text-center'>
                        <label className='font-semibold'>Password</label><br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Your Password'
                            className='w-full p-1 rounded-lg'
                        />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className='bg-fuchsia-900 w-full p-1 rounded-lg mt-5 font-semibold'>Login</button>
                        <Link to="/register" className='text-blue-300  '>New User? Register Here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
