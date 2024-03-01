import { useForm } from "../../hooks/useForm";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import "./styles.css";

export const LoginForm = () => {
  const { form, email, password, onChange } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    console.log(form);
  };

  return (
    <div className="formContent">
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
      <Button id="loginButton" label="Iniciar sesión" onClick={onSubmit} />
    </div>
  );
};
