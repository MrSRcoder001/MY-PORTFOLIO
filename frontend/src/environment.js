const isProd = true;

const server = {
  baseURL: isProd
    ? "https://my-portfolio-csy5.onrender.com/api"
    : "http://localhost:5000/api"
};

export default server;
