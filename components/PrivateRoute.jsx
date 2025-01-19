'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(null); // Initialize token state
  const [loading, setLoading] = useState(true); // Set loading state

  const getLocalStorageValue = (key) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  useEffect(() => {
    const token = getLocalStorageValue("token");
    if (token) {
      setToken(token); // Set token if available
    }
    setLoading(false); // Set loading false once the check is done
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        console.warn('No token found, redirecting to login...');
        router.push('/'); // Redirect to login if no token
      } else {
        // You can choose to show the protected content here or redirect as needed
        // router.push('/table'); // Uncomment if redirection to table is required
      }
    }
  }, [loading, token, router]);

  if (loading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  return children; // Return children if authenticated
};

export default PrivateRoute;
