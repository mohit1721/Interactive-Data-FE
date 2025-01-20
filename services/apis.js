const BASE_URL= "https://interactive-data-table-application.onrender.com/api/v1" || process.env.REACT_APP_BASE_URL;
// const BASE_URL="http://localhost:5000/api/v1"
export const authENDPOINTS={
    SIGNUP_API: BASE_URL + "/auth/register",
    LOGIN_API: BASE_URL + "/auth/login",
}
export const dataENDPOINTS={
    GET_DATA_API: BASE_URL+"/data"
}