import axios from "axios";
import server from "../environment";

const API = axios.create({
  baseURL: server.baseURL,
  timeout: 60000,
});

// Attach token automatically when available.
API.interceptors.request.use((config) => {
  try {
    const token = window?.localStorage?.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    // ignore
  }
  return config;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.warn(`Endpoint not found: ${error.config.url}`);
    }
    return Promise.reject(error);
  }
);

export default API;
