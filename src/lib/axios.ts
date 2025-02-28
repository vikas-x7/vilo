import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // kyuki Next.js ka backend same project me he
  withCredentials: false, // agar cookies use karega
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (future me token lagane ke liye)
// api.interceptors.request.use((config) => {
//   // example:
//   // const token = localStorage.getItem("token");
//   // if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// Response Interceptor (global error handle)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
