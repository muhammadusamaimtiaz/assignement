import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedToken = import.meta.env.VITE_LOCAL_AUTH_COOKIE || "token";
    const token = Cookies.get(storedToken);
    if (token) {
      config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const storedToken = import.meta.env.VITE_LOCAL_AUTH_COOKIE || "token";
      Cookies.remove(storedToken);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
