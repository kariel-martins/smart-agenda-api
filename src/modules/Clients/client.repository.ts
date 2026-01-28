import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { InsertClient, Client, UpdateClient } from "./dtos/client.dto.type";
import { clients } from "../../database/Schemas";

export class ClientRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertClient): Promise<Client> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(clients).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "Client/client.repository.ts/create",
    );
  }

  public getById(client_id: string): Promise<Client> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(clients)
          .where(eq(clients.id, client_id));

        return result[0];
      },
      "Erro ao executar getById",
      "Client/client.repository.ts/create",
    );
  }

  public getAll(): Promise<Client[]> {
    return this.execute.repository(
      async () => {
        const result = await db.select().from(clients);

        return result;
      },
      "Erro ao executar getAll",
      "Client/client.repository.ts/create",
    );
  }

  public update(client_id: string, data: UpdateClient): Promise<Client> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(clients)
          .set(data)
          .where(eq(clients.id, client_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "Client/client.repository.ts/create",
    );
  }

  public delete(client_id: string) {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(clients)
          .where(eq(clients.id, client_id))
          .returning();

        return result[0];
      },
      "Erro ao executar delete",
      "Client/client.repository.ts/create",
    );
  }
}
