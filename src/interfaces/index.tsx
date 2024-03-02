export interface IBasicResponse {
  error: boolean;
  message: string;
}
export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthRegisterRequest extends IAuthLoginRequest {
  name: string;
}

export interface IAuthResponse extends IBasicResponse {
  email: string;
  name: string;
  userId: number;
  token: string;
}

export interface IProductProps {
  name: string;
  description: string;
  price: string;
}

export interface IProduct extends IProductProps {
  id_product: number | string;
  id_user?: number | string;
}

export interface IProductsResponse extends IBasicResponse {
  error: boolean;
  message: string;
  products: IProduct[];
}

export interface IProductResponse extends IBasicResponse {
  productInfo: IProduct;
}
