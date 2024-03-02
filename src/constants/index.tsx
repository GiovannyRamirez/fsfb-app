export const URL_PAGES = {
  WELCOME: "/",
  PRODUCTS: "/products",
};

export const ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_BACKEND_API,
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  PRODUCTS: {
    BASE: "/products",
    ALL: "/products/all",
  },
};

export const STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  EMPTY: 204,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  ERROR: 500,
};

export const GET_ERROR = (err: string) => {
  const validMessages = {
    "User can not be created because email already exists":
      "El usuario con ese correo ya existe",
    "User or password incorrect": "Usuario o contraseña incorrectos",
    "Token expired": "El token ha expirado",
  };

  return (
    validMessages[err as keyof typeof validMessages] ||
    "Algo ha ocurrido, intenta de nuevo"
  );
};
