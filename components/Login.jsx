
"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import {toast} from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { login } from "@/services/operations/authAPI";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState("");
  const router = useRouter(); // Next.js router for navigation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.username === "demo" && formData.password === "demo") {
  //     toast.success("User Login Successfully")
  //       router.push("/table");
  //   } else {
  //     setError("Invalid username or password.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for valid username and password
    if (formData.username && formData.password) {
      try {
        // Call the login function
        const response = await login(formData.username, formData.password);
        

        if (response) {
          localStorage.setItem("token", JSON.stringify(response.token));
          // Redirect to the table page after successful login
          router.push("/table");
        }
      } catch (error) {
        setError("Invalid username or password."); // Set error if login fails
      }
    } else {
      setError("Please enter both username and password.");
    }
  };
  
  return (
    <div className="flex form-container flex-col items-center justify-center h-screen text-black bg-gray-100">
     <form onSubmit={handleSubmit}>
      <label>
                <strong>Username <sup className="text-pink-600 font-bold ">*</sup></strong>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
             
                  required
                />
              </label>
              <label className='relative'>
                <strong>Password <sup className="text-pink-600 font-bold ">*</sup></strong>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                   placeholder="Enter Password"
                  onChange={handleChange}
                  style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
             
                  required
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
      
              </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
