import axios from "axios";

import { ENDPOINTS } from "../../constants";

const baseURL = ENDPOINTS.BASE_URL;

const authApi = axios.create({
  baseURL,
});

export default authApi;
