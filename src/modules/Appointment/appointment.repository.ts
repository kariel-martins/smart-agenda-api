import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { Appointment, InsertAppointment, UpdateAppointment } from "./dtos/appointment.dto.type";
import { availabilities } from "../../database/Schemas";

export class AppointmentRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertAppointment): Promise<Appointment> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(availabilities).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "Appointment/appointment.repository.ts/create",
    );
  }

  public getById(Appointment_id: number): Promise<Appointment> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(availabilities)
          .where(eq(availabilities.id, Appointment_id));

        return result[0];
      },
      "Erro ao executar getById",
      "Appointment/appointment.repository.ts/create",
    );
  }

  public getAll(): Promise<Appointment[]> {
    return this.execute.repository(
      async () => {
        const result = await db.select().from(availabilities);

        return result;
      },
      "Erro ao executar getAll",
      "Appointment/appointment.repository.ts/create",
    );
  }

  public update(Appointment_id: number, data: UpdateAppointment): Promise<Appointment> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(availabilities)
          .set(data)
          .where(eq(availabilities.id, Appointment_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "Appointment/appointment.repository.ts/create",
    );
  }

  public delete(Appointment_id: number) {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(availabilities)
          .where(eq(availabilities.id, Appointment_id))
          .returning();

        return result[0];
      },
      "Erro ao executar delete",
      "Appointment/appointment.repository.ts/create",
    );
  }
}
