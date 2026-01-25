import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { refresh_tokens, users } from "../../../database/Schemas";

export type User = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>
export type updateUser = Partial<InsertUser>
export type UserOmitPassword = Omit<User, "password_hash">

export type tokenRefresh = InferSelectModel<typeof refresh_tokens>
export type InsertTokenRefresh = InferInsertModel<typeof refresh_tokens>
export type UpdateTokenRefresh = Partial<InferInsertModel<typeof refresh_tokens>>

export type tokensWithUser = {
    users: UserOmitPassword
    refresh_token: string,
    token: string
}