
import { apiconnector } from "../apiconnector"
import { dataENDPOINTS } from "../apis"
const {GET_DATA_API}=dataENDPOINTS

export const getDataLists = async (token,{ page , rowsPerPage , search , sortBy , order }) => {
  let result = "";
  try {
    
  // Check if token is valid
  if (!token) {
    console.error("Token is missing or invalid.");
    return result;
  }
    // Prepare query parameters
    const params = { page, rowsPerPage, search, sortBy, order };
   // Build query string from params
   const queryString = new URLSearchParams(params).toString();
   const apiUrl = `${GET_DATA_API}?${queryString}`;
    // Call the API using apiConnector
    const response = await apiconnector("GET", apiUrl, {
        headers: {
        'Authorization': `Bearer ${token}`, // Send token as Bearer in Authorization header
      },
      credentials: 'include', // Optional: include cookies if needed
    });

    // Handle response
    if (!response?.data) {
      throw new Error("Could not fetch data from the server");
    }

    result = response.data;
    console.log("Fetched Data:", result);
  } catch (error) {
    console.error("GET_DATA_LISTS_API ERROR:", error);
    // Optionally handle error UI feedback (e.g., toast notification)
    // toast.error("Failed to fetch data");
  }

  return result; // Return the fetched data
};
