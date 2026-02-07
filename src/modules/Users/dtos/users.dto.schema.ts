import { validation } from "../../../share/middlewares/Validation";
import { z } from "zod";
import { schemaVars } from "../../../share/utils/schemasVars";

const createUsersSchema = z.object({
  name: schemaVars.text,
  role: schemaVars.text, //tem que ser um enum
  email: schemaVars.email,
  phone: schemaVars.text,
  password: schemaVars.password,
  confirmPassword: schemaVars.password,
});

const createUsersUpdateSchema = z.object({
  name: schemaVars.text,
  role: schemaVars.text, //tem que ser um enum
  email: schemaVars.email,
  phone: schemaVars.text,
  password: schemaVars.password,
  confirmPassword: schemaVars.password,
}).partial();

const getByIdUsers = z.object({
  user_id: schemaVars.id
})
export const createUsersValidation = validation((getSchemas) => ({
  body: getSchemas(createUsersSchema),
}));

export type createUsersData = z.infer<typeof createUsersSchema>;

export const usersByIdValidation = validation((getSchemas) => ({
  params: getSchemas(getByIdUsers)
}));

export const updateUsersValidation = validation((getSchemas) => ({
  body: getSchemas(createUsersUpdateSchema),
}));

