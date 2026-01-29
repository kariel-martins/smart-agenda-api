import { validation } from "../../../share/middlewares/Validation";
import { z } from "zod";
import { schemaVars } from "../../../share/utils/schemasVars";

const createUsersSchema = z.object({
  name: schemaVars.text,
  nameBusiness: schemaVars.text,
  email: schemaVars.email,
  phone: schemaVars.text,
  password: schemaVars.password,
  confirmPassword: schemaVars.password,
});

export const createUsersValidation = validation((getSchemas) => ({
  body: getSchemas(createUsersSchema),
}));

export type createUsersData = z.infer<typeof createUsersSchema>;

const loginSchema = z.object({
  email: schemaVars.email,
  password: schemaVars.password,
});

export const loginValidation = validation((getSchemas) => ({
  body: getSchemas(loginSchema),
}));

export type loginData = z.infer<typeof loginSchema>;

const refreshSchema = z.object({
  user_id: schemaVars.text,
});

export const refreshValidation = validation((getSchemas) => ({
  params: getSchemas(refreshSchema),
}));

const forgotPasswordSchema = z.object({
  email: schemaVars.email,
});

export const forgotPasswordValidation = validation((getSchemas) => ({
  body: getSchemas(forgotPasswordSchema),
}));

export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const resetPasswordSchema = z.object({
  password: schemaVars.password,
  confirmPassword: schemaVars.password,
});
const resetPasswordUserIdSchema = z.object({
  user_id: schemaVars.text,
});

export const resetPasswordValidation = validation((getSchemas) => ({
  body: getSchemas(resetPasswordSchema),
  params: getSchemas(resetPasswordUserIdSchema),
}));

export type resetPasswordData = z.infer<typeof resetPasswordSchema>;
