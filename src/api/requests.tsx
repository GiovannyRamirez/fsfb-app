import productsApi from "./config";

import {
  IAuthLoginRequest,
  IAuthRegisterRequest,
  IAuthResponse,
  IBasicResponse,
  IProductProps,
  IProductResponse,
  IProductsResponse,
} from "../interfaces";

import { ENDPOINTS } from "../constants";

export const registerUser = async (data: IAuthRegisterRequest) => {
  const response = await productsApi.post<IAuthResponse>(ENDPOINTS.LOGIN, data);

  return response;
};

export const loginUser = async (data: IAuthLoginRequest) => {
  const response = await productsApi.post<IAuthResponse>(ENDPOINTS.LOGIN, data);

  return response;
};

export const getAllProducts = async () => {
  const response = await productsApi.get<IProductsResponse>(
    ENDPOINTS.PRODUCTS.ALL
  );

  return response;
};

export const postProduct = async (data: IProductProps) => {
  const response = await productsApi.post<IProductResponse>(
    ENDPOINTS.PRODUCTS.ALL,
    data
  );

  return response;
};

export const putProduct = async (id: number, data: IProductProps) => {
  const response = await productsApi.put<IProductResponse>(
    `${ENDPOINTS.PRODUCTS.BASE}/${id}`,
    data
  );

  return response;
};

export const deleteProduct = async (id: number) => {
  const response = await productsApi.delete<IBasicResponse>(
    `${ENDPOINTS.PRODUCTS.BASE}/${id}`
  );

  return response;
};
