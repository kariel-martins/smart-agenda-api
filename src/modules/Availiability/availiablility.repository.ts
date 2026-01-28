import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { Availiablility, InsertAvailiablility, UpdateAvailiablility } from "./dtos/service.dto.type";
import { availabilities } from "../../database/Schemas";

export class AvailiablilityRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertAvailiablility): Promise<Availiablility> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(availabilities).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "Availiablility/availiablility.repository.ts/create",
    );
  }

  public getById(availiablility_id: number): Promise<Availiablility> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(availabilities)
          .where(eq(availabilities.id, availiablility_id));

        return result[0];
      },
      "Erro ao executar getById",
      "Availiablility/availiablility.repository.ts/create",
    );
  }

  public getAll(): Promise<Availiablility[]> {
    return this.execute.repository(
      async () => {
        const result = await db.select().from(availabilities);

        return result;
      },
      "Erro ao executar getAll",
      "Availiablility/availiablility.repository.ts/create",
    );
  }

  public update(availiablility_id: number, data: UpdateAvailiablility): Promise<Availiablility> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(availabilities)
          .set(data)
          .where(eq(availabilities.id, availiablility_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "Availiablility/availiablility.repository.ts/create",
    );
  }

  public delete(availiablility_id: number) {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(availabilities)
          .where(eq(availabilities.id, availiablility_id))
          .returning();

        return result[0];
      },
      "Erro ao executar delete",
      "Availiablility/availiablility.repository.ts/create",
    );
  }
}
