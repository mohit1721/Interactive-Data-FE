'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
 const getLocalStorageValue = (key) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  useEffect(() => {
    const data = getLocalStorageValue("token");
    if (data) {
      setToken(data);
    }
  }, []);
  const [loading, setLoading] = useState(true);
// console.log("token in private route Tasklist-->", token)
  useEffect(() => {
    if (!token) {
      console.warn('No token found, redirecting to login...');
      // Redirect to login page if no token
      router.push('/');
    } else {
      setLoading(false); // Set loading false once the token is verified
      router.push('/table')
    }
  }, [token, router]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
  }

  return children; // Return children (protected components) if authenticated
};

export default PrivateRoute;
