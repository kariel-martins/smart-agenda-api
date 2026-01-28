import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { availabilities } from "../../../database/Schemas";

export type Availiablility = InferSelectModel<typeof availabilities>
export type InsertAvailiablility = InferInsertModel<typeof availabilities>
export type UpdateAvailiablility = Partial<InsertAvailiablility> 