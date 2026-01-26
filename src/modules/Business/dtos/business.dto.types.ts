import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { businesses } from "../../../database/Schemas";

export type Business = InferSelectModel<typeof businesses>
export type InsertBusiness = InferInsertModel<typeof businesses>
export type UpdateBusiness = Partial<InsertBusiness>