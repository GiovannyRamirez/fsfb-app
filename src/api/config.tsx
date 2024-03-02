import axios from "axios";

import { ENDPOINTS, STATUS } from "../constants";

const productsApi = axios.create({
  baseURL: ENDPOINTS.BASE_URL,
});

productsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["app-token"] = token;
  }

  return config;
});

productsApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if ([STATUS.UNAUTHORIZED].includes(err?.response?.status)) {
      alert("Sesión expirada");
      location.reload();
    }
  }
);

export default productsApi;
