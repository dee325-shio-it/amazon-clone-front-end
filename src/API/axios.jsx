import axios from "axios";

// Create an axios instance (custom instance)
const axiosInstance = axios.create({
  baseURL: "https://amazon-api-paqp.onrender.com", // Use the deployed URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Export axiosInstance
export { axiosInstance };

// import axios from "axios";

// const axiosInstance = axios.create({
//   //local instance of firebase function
//   // baseURL: "http://127.0.0.1:5001/clone-af8c8/us-central1/api",
//   baseURL: "http://localhost:5001",
//   //deployed version of amazon server on render.com
//   baseURL: "https://amazon-api-paqp.onrender.com",
// });

// export default axiosInstance;
