import { z } from "zod";

const text = z
  .string({
    required_error: "Deve ser uma string",
    invalid_type_error: "Deve ser uma string",
  })
  .min(3, "Deve conter no mínimo três caracteres");

const email = z
  .string({
    required_error: "Deve ser uma string",
  })
  .regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/, "Formato de email inválido");

const password = z.string().regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  "Formato de senha inválido"
);

const number = z.preprocess(
  (val) => Number(val),
  z.number({ invalid_type_error: "Deve ser um número" })
);

const id = z.string({
  required_error: "Deve ser uma string",
});

const url = z
  .string({
    required_error: "Deve ser uma string",
  })
  .url("Formato de URL inválido");

const date = z
  .string()
  .regex(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    "Formato de data inválido (YYYY-MM-DD)"
  );

export const schemaVars = {
  text,
  email,
  password,
  id,
  number,
  url,
  date,
};
