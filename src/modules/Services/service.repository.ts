import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { InsertService, Service, UpdateService } from "./dtos/service.dto.type";
import { services } from "../../database/Schemas";

export class ServiceRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertService): Promise<Service> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(services).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "Service/service.repository.ts/create",
    );
  }

  public getById(service_id: number): Promise<Service> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(services)
          .where(eq(services.id, service_id));

        return result[0];
      },
      "Erro ao executar getById",
      "Service/service.repository.ts/create",
    );
  }

  public getAll(): Promise<Service[]> {
    return this.execute.repository(
      async () => {
        const result = await db.select().from(services);

        return result;
      },
      "Erro ao executar getAll",
      "Service/service.repository.ts/create",
    );
  }

  public update(service_id: number, data: UpdateService): Promise<Service> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(services)
          .set(data)
          .where(eq(services.id, service_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "Service/service.repository.ts/create",
    );
  }

  public delete(service_id: number) {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(services)
          .where(eq(services.id, service_id))
          .returning();

        return result[0];
      },
      "Erro ao executar delete",
      "Service/service.repository.ts/create",
    );
  }
}
