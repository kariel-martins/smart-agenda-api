import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { services } from "../../../database/Schemas";

export type Service = InferSelectModel<typeof services>
export type InsertService = InferInsertModel<typeof services>
export type UpdateService = Partial<InsertService> 