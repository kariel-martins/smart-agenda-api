import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { no_show_rules } from "../../../database/Schemas";

export type NoShowRole = InferSelectModel<typeof no_show_rules>
export type InsertNoShowRole = InferInsertModel<typeof no_show_rules>
export type UpdateNoShowRole = Partial<InsertNoShowRole> 