import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import { loginUser } from "../../api/requests";
import { GET_ERROR, URL_PAGES } from "../../constants";

import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";

import "./styles.css";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>("");

  const { email, password, onChange } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await loginUser({
        email,
        password,
      });

      const userToSave = JSON.stringify({
        name: data.name,
        email: data.email,
        userId: data.userId,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", userToSave);
      navigate(URL_PAGES.PRODUCTS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = GET_ERROR(err?.response?.data?.error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || !password;

  return (
    <div className="formContent">
      <Loader loading={loading} />
      <h3 className="loginTitle">Iniciar sesión</h3>
      <Input
        id="emailInput"
        label="Correo electrónico"
        value={email}
        onChange={({ target }) => onChange(target.value, "email")}
      />
      <Input
        id="passwordInput"
        label="Contraseña"
        type="password"
        value={password}
        onChange={({ target }) => onChange(target.value, "password")}
      />
      <Button
        disabled={isButtonDisabled}
        id="loginButton"
        label="Iniciar sesión"
        onClick={onSubmit}
      />

      <Modal open={Boolean(error)} onClose={() => setError(false)}>
        <h3 className="error">{error}</h3>
      </Modal>
    </div>
  );
};
