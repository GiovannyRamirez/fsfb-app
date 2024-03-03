import authApi from "../auth/config";

import {
  IAuthLoginRequest,
  IAuthRegisterRequest,
  IAuthResponse,
} from "../../interfaces";

import { ENDPOINTS } from "../../constants";

export const registerUser = async (data: IAuthRegisterRequest) => {
  const response = await authApi.post<IAuthResponse>(ENDPOINTS.LOGIN, data);

  return response;
};

export const loginUser = async (data: IAuthLoginRequest) => {
  const response = await authApi.post<IAuthResponse>(ENDPOINTS.LOGIN, data);

  return response;
};
