import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { refresh_tokens, users } from "../../../database/Schemas";

export type User = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>
export type updateUser = Partial<InsertUser>
export type UserOmitPassword = Omit<User, "password_hash">

export type tokenRefresh = InferSelectModel<typeof refresh_tokens>
export type InsertTokenRefresh = InferInsertModel<typeof refresh_tokens>
export type UpdateTokenRefresh = Partial<InferInsertModel<typeof refresh_tokens>>

type roleType = "admin" | "manager" | "staff"
export type CreateUserWithBusiness = {
  email: string;
  name: string;
  nameBusiness: string;
  phone: string;
  password_hash: string;
  tokenRefresh: string
  role: roleType
};