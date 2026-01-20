import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "../../../database/Schemas";

export type InsertUsers = InferInsertModel<typeof users>
export type Users = InferSelectModel<typeof users>
export type updateUsers = Partial<InsertUsers>