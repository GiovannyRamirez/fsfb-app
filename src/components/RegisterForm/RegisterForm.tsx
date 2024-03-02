import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import { registerUser } from "../../api/requests";
import { GET_ERROR, STATUS, URL_PAGES } from "../../constants";

import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modal/Modal";

import "./styles.css";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | string>("");

  const { name, email, password, confirmPassword, onChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const { data, status } = await registerUser({
        name,
        email,
        password,
      });

      if (status === STATUS.ACCEPTED) {
        const errorMessage = GET_ERROR(String(data.error));
        setError(errorMessage);
      } else {
        const userToSave = JSON.stringify({
          name: data.name,
          email: data.email,
          userId: data.userId,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", userToSave);
        navigate(URL_PAGES.PRODUCTS);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = GET_ERROR(err?.response?.data?.error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  return (
    <div className="formContent">
      <Loader loading={loading} />
      <h3 className="registerTitle">Regístrate</h3>
      <Input
        id="nameInput"
        label="Nombre"
        value={name}
        onChange={({ target }) => onChange(target.value, "name")}
      />
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
      <Input
        id="confirmPasswordInput"
        label="Confirma contraseña"
        type="password"
        value={confirmPassword}
        onChange={({ target }) => onChange(target.value, "confirmPassword")}
      />
      <Button
        disabled={isButtonDisabled}
        id="registerButton"
        label="Registrarme"
        onClick={onSubmit}
      />

      <Modal open={Boolean(error)} onClose={() => setError(false)}>
        <h3 className="error">{error}</h3>
      </Modal>
    </div>
  );
};
