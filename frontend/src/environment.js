// Configure backend URLs.
// - `VITE_API_ORIGIN` (optional): e.g. "https://your-backend.com" (no trailing "/api")
// - `VITE_API_BASE_URL` (optional): e.g. "https://your-backend.com/api"
const defaultOrigin = import.meta.env.PROD
  ? "https://my-portfolio-1-ls4c.onrender.com"
  : "http://localhost:5000";

const origin = import.meta.env.VITE_API_ORIGIN || defaultOrigin;
const baseURL = import.meta.env.VITE_API_BASE_URL || `${origin}/api`;

const server = { origin, baseURL };

export default server;
