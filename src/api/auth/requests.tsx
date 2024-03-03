import authApi from "../auth/config";

import {
  IAuthLoginRequest,
  IAuthRegisterRequest,
  IAuthResponse,
} from "../../interfaces";

import { ENDPOINTS } from "../../constants";

export const registerUser = async (data: IAuthRegisterRequest) =>
  await authApi.post<IAuthResponse>(ENDPOINTS.REGISTER, data);

export const loginUser = async (data: IAuthLoginRequest) =>
  await authApi.post<IAuthResponse>(ENDPOINTS.LOGIN, data);
