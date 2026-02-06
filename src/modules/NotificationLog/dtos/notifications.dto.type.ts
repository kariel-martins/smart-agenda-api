import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { notification_logs } from "../../../database/Schemas";

export type Notification = InferSelectModel<typeof notification_logs>
export type InserNotification = InferInsertModel<typeof notification_logs> 