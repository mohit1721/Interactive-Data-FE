'use client'
import axios from 'axios';
// import { useSelector } from 'react-redux';
// import store from '../lib/store'
// Create a custom axios instance
export const axiosInstance = axios.create({
  withCredentials: true, // Always include credentials for cross-origin requests


});

// Add a request interceptor to handle the token
axiosInstance.interceptors.request.use(
  (config) => {
  
      // const tokenFromRedux = store.getState().auth?.token;
      // Fetch token from localStorage
      const tokenFromLocalStorage = localStorage.getItem('token') 
      // ? JSON.parse(localStorage.getItem('token')) 
      // : 'null';  
      // Prioritize Redux token, fallback to localStorage if not present
      const token =  tokenFromLocalStorage;

    if (token) {
      config.headers.Authorization = `Bearer ${ token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Connector Function
export const apiconnector = async (method, url, bodyData , headers, params ) => {
  // Merge custom headers with default ones
  const defaultHeaders = {
    'Content-Type': 'application/json', // Default to JSON content type
    ...headers, // Merge any custom headers passed to the function
};

  return axiosInstance({
    method, // No need for string interpolation
    url,
    data: bodyData,
    headers: defaultHeaders,
    params,
    withCredentials: true, // Ensure cookies and credentials are included
  });


};
