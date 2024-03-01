import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://localhost:3000",
});

productsApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["app-token"] = token;
  }

  return config;
});

export default productsApi;
