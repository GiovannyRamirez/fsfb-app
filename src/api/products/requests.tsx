import productsApi from "./config";

import {
  IBasicResponse,
  IProductProps,
  IProductResponse,
  IProductsResponse,
} from "../../interfaces";

import { ENDPOINTS } from "../../constants";

export const getAllProducts = async () =>
  await productsApi.get<IProductsResponse>(ENDPOINTS.PRODUCTS.ALL);

export const postProduct = async (data: IProductProps) =>
  await productsApi.post<IProductResponse>(ENDPOINTS.PRODUCTS.ALL, data);

export const putProduct = async (id: number, data: IProductProps) =>
  await productsApi.put<IProductResponse>(
    `${ENDPOINTS.PRODUCTS.BASE}/${id}`,
    data
  );

export const deleteProduct = async (id: number) =>
  await productsApi.delete<IBasicResponse>(`${ENDPOINTS.PRODUCTS.BASE}/${id}`);
