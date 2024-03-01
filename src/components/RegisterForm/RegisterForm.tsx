import { useForm } from "../../hooks/useForm";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import "./styles.css";

export const RegisterForm = () => {
  const { form, name, email, password, confirmPassword, onChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = () => {
    console.log(form);
  };

  return (
    <div className="formContent">
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
      <Button id="registerButton" label="Registrarme" onClick={onSubmit} />
    </div>
  );
};
