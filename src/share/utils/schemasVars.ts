import { z } from "zod";

const text = z.string("Deve ser uma string").min(3, "Deve conter no miníno três caracteres");
const email = z.string("Deve ser uma string").regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/, "Formado de email inválido");
const password = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "Formado de senha inválido");
const number = z.number("Deve ser um número")
const id = z.string("Deve ser uma string")
const url = z.url("Formato de url inválido")

  export const schemaVars = {
    text,
    email,
    password,
    id,
    number,
    url
  }