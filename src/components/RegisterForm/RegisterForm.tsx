import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import { RegisterSchema } from "../../utils/formSchemas";

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

  const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formErrors, setFormErrors] = useState(initialForm);

  const { name, email, password, confirmPassword, onChange } =
    useForm(initialForm);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const body = { name, email, password };

      const validation = RegisterSchema.safeParse({ ...body, confirmPassword });
      if (!validation.success) {
        const formattedErrors = validation.error.format();

        return setFormErrors({
          name: formattedErrors.name?._errors[0] ?? "",
          email: formattedErrors.email?._errors[0] ?? "",
          password: formattedErrors.password?._errors[0] ?? "",
          confirmPassword: formattedErrors.confirmPassword?._errors[0] ?? "",
        });
      }
      setFormErrors(initialForm);

      const { data, status } = await registerUser(body);

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

  const isButtonDisabled = !name || !email || !password || !confirmPassword;

  return (
    <div className="formContent">
      <Loader loading={loading} />
      <h3 className="registerTitle">Regístrate</h3>
      <Input
        id="nameInput"
        label="Nombre"
        value={name}
        error={formErrors.name}
        onChange={({ target }) => onChange(target.value, "name")}
      />
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
      <Input
        id="confirmPasswordInput"
        label="Confirma contraseña"
        type="password"
        value={confirmPassword}
        error={formErrors.confirmPassword}
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
