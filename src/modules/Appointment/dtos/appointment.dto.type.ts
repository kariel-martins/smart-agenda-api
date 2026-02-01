import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { appointment } from "../../../database/Schemas";

export type Appointment = InferSelectModel<typeof appointment>
export type InsertAppointment = InferInsertModel<typeof appointment>
export type UpdateAppointment = Partial<InsertAppointment> 