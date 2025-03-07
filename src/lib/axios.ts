import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // kyuki Next.js ka backend same project me he
  withCredentials: false, // agar cookies use karega
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("user_id");
    console.log("[Axios] Request interceptor user_id:", userId);
    if (userId) {
      config.headers["x-user-id"] = userId;
    } else {
      console.warn("[Axios] No user_id found in localStorage! Next request will likely 401.");
    }
  }
  return config;
});

// Response Interceptor (global error handle)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
