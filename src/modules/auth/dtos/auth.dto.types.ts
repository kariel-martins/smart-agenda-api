import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { businesses, refresh_tokens, users } from "../../../database/Schemas";

export type User = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>
export type updateUser = Partial<InsertUser>
export type UserOmitPassword = Omit<User, "password_hash">

export type tokenRefresh = InferSelectModel<typeof refresh_tokens>
export type InsertTokenRefresh = InferInsertModel<typeof refresh_tokens>
export type UpdateTokenRefresh = Partial<InferInsertModel<typeof refresh_tokens>>

export type Business = InferSelectModel<typeof businesses>
export type InsertBusiness = InferInsertModel<typeof businesses>

export type UserAndBusiness = {
    userData: User,
    businessData: Business
}

export type CreateUserWithBusiness = {
  email: string;
  name: string;
  nameBusiness: string;
  phone: string;
  password_hash: string;
  tokenRefresh: string
};

export type tokensWithUserAndBusiness = {
    usersData: UserOmitPassword
    businessData: Business,
    refresh_token: string,
    token: string
}