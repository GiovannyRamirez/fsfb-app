import { z } from "zod";

const email = z
  .string()
  .email({ message: "Debe ser un correo electrónico válido" });

const name = z
  .string()
  .min(3, { message: "Debe contener al menos 3 caracteres" });

const password = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
    {
      message:
        "Debe contener al menos 4 caracteres (1 mayúscula, 1 minúscula, 1 dígito, 1 caracter especial)",
    }
  );

const description = name;

const price = z
  .string()
  .regex(/(?=.*\d)/, { message: "Debe ser un valor númerico válido" });

export const RegisterSchema = z
  .object({
    name,
    email,
    password,
    confirmPassword: name,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email,
  password,
});

export const ProductSchema = z.object({
  name,
  description,
  price,
});
