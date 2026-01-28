import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { availabilities } from "../../../database/Schemas";

export type Appointment = InferSelectModel<typeof availabilities>
export type InsertAppointment = InferInsertModel<typeof availabilities>
export type UpdateAppointment = Partial<InsertAppointment> 