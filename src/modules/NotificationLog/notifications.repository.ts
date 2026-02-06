import { eq } from "drizzle-orm";
import { db } from "../../database/Client";
import { notification_logs } from "../../database/Schemas";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { Notification } from "./dtos/notifications.dto.type";

export class NotificationsRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: {
    appointment_id: number;
    type: string;
    status?: string;
  }) {
    return this.execute.repository(
      async () => {
        const result = await db
          .insert(notification_logs)
          .values(data)
          .returning();

        return result[0];
      },
      "Erro ao criar notification log",
      "Notifications/notifications.repository.ts/create"
    );
  }

  public async findByAppointmentAndType(
  appointment_id: number,
  type: string
): Promise<Notification | null> {
  try {
    const result = await db
      .select()
      .from(notification_logs)
      .where(eq(notification_logs.appointment_id, appointment_id));

    const log = result.find(log => log.type === type);

    return log ?? null;
  } catch (error) {
    throw error;
  }
}

  public getLogs(status?: string): Promise<Notification[]> {
    return this.execute.repository(
      async () => {
        if (!status) {
          return db.select().from(notification_logs);
        }

        return db
          .select()
          .from(notification_logs)
          .where(eq(notification_logs.status, status));
      },
      "Erro ao buscar logs",
      "Notifications/notifications.repository.ts/getLogs"
    );
  }
}
