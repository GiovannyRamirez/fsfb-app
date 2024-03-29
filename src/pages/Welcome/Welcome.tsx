import { useState } from "react";
import { Navigate } from "react-router-dom";

import { URL_PAGES } from "../../constants";

import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Button } from "../../components/Button/Button";

import stockImg from "../../assets/img/stock.jpg";

import "./styles.css";

export const Welcome = () => {
  const [formType, setFormType] = useState("login");

  const token = localStorage.getItem("token");
  if (token) return <Navigate to={URL_PAGES.PRODUCTS} />;

  const isLoginFormType = formType === "login";

  const renderForm = {
    login: <LoginForm />,
    register: <RegisterForm />,
  };

  const onChangeFormType = () =>
    setFormType(isLoginFormType ? "register" : "login");

  const footerButtonText = isLoginFormType ? "Registrarme" : "Iniciar sesión";
  const footerText = isLoginFormType
    ? "No tengo una cuenta"
    : "Ya tengo una cuenta";

  return (
    <div className="welcomeMain">
      <div className="welcomeImage">
        <img className="welcomeImg" src={stockImg} alt="Welcome Img" />
      </div>
      <div className="welcomeContent">
        <div className="welcomeText">
          <h1 className="welcomeTitle">¡Bienvenido!</h1>
          <h2 className="welcomeSubtitle">
            Aquí podrás administrar tus productos
          </h2>
        </div>
        <div className="welcomeForm">
          {renderForm[formType as keyof typeof renderForm]}
        </div>
        <div className="welcomeActions">
          <h4>{footerText}</h4>
          <Button
            id="changeFormTypeButton"
            label={footerButtonText}
            variant="contained"
            onClick={onChangeFormType}
          />
        </div>
      </div>
    </div>
  );
};
