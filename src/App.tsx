import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { URL_PAGES } from "./constants";

import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import { Products } from "./pages/Products/Products";
import { Welcome } from "./pages/Welcome/Welcome";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={URL_PAGES.WELCOME} element={<Welcome />} />
        <Route element={<ProtectedRoute />}>
          <Route path={URL_PAGES.PRODUCTS} element={<Products />} />
        </Route>
        <Route path="*" element={<Navigate to={URL_PAGES.WELCOME} />} />
      </Routes>
    </BrowserRouter>
  );
};
