import axios from "axios";

import { ENDPOINTS, STATUS } from "../../constants";

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
  (response) => response,
  (err) => {
    if ([STATUS.UNAUTHORIZED].includes(err?.response?.status)) {
      alert("Sesión expirada");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      location.reload();
    }

    return err;
  }
);

export default productsApi;
