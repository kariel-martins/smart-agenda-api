import { validation } from "../../../share/middlewares/Validation";
import { z } from "zod";
import { schemaVars } from "../../../share/utils/schemasVars";

const createUsersSchema = z.object({
  name: schemaVars.text,
  email: schemaVars.email,
  password: schemaVars.password,
  comfirmPassword: schemaVars.password,
});

export const createUsersValidation = validation((getSchemas) => ({
  body: getSchemas(createUsersSchema),
}));

export type createUsersData = z.infer<typeof createUsersSchema>;

const loginSchema = z.object({
    email: schemaVars.email,
    password: schemaVars.password
})

export const loginValidation = validation((getSchemas) => ({
    body: getSchemas(loginSchema)
}))

export type loginData = z.infer<typeof loginSchema>