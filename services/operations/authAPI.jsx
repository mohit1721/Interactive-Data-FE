import { toast } from "react-hot-toast"

import { apiconnector } from "../apiconnector"
import { authENDPOINTS } from "../apis"

const {

  LOGIN_API,
  
} = authENDPOINTS



  export async function login(username, password) {
    const toastId = toast.loading("Loading...");
    try {
      // console.log("details logged-->", username, password);
      const response = await apiconnector("POST", LOGIN_API, { username, password });
  
      console.log("LOGIN API RESPONSE:", response);
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      toast.success("Login Successful");
      return response.data; // Return the data directly
    } catch (error) {
      console.log("LOGIN API ERROR:", error);
      toast.error(error.response?.data?.message || "Login Failed");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  }
  