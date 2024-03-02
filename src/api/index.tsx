import axios from "axios";

import { ENDPOINTS } from "../constants";

const productsApi = axios.create({
  baseURL: ENDPOINTS.BASE_URL,
});

productsApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["app-token"] = token;
  }

  return config;
});

export default productsApi;
