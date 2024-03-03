import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import { LoginSchema } from "../../utils/formSchemas";

import { loginUser } from "../../api/auth/requests";
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

  const initialForm = {
    email: "",
    password: "",
  };

  const [formErrors, setFormErrors] = useState(initialForm);

  const { email, password, onChange } = useForm(initialForm);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const body = { email, password };
      const validation = LoginSchema.safeParse(body);
      if (!validation.success) {
        const formattedErrors = validation.error.format();

        return setFormErrors({
          email: formattedErrors.email?._errors[0] ?? "",
          password: formattedErrors.password?._errors[0] ?? "",
        });
      }
      setFormErrors(initialForm);

      const { data } = await loginUser(body);

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
        error={formErrors.email}
        onChange={({ target }) => onChange(target.value, "email")}
      />
      <Input
        id="passwordInput"
        label="Contraseña"
        type="password"
        value={password}
        error={formErrors.password}
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
