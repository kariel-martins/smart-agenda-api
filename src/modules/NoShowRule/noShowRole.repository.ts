import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { NoShowRole, InsertNoShowRole, UpdateNoShowRole } from "./dtos/noShowRole.dto.type";
import { no_show_rules } from "../../database/Schemas";

export class NoShowRoleRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertNoShowRole): Promise<NoShowRole> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(no_show_rules).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "NoShowRole/noShowRole.repository.ts/create",
    );
  }

  public getById(noShowRole_id: number): Promise<NoShowRole> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(no_show_rules)
          .where(eq(no_show_rules.id, noShowRole_id));

        return result[0];
      },
      "Erro ao executar getById",
      "NoShowRole/noShowRole.repository.ts/create",
    );
  }

  public getAll(): Promise<NoShowRole[]> {
    return this.execute.repository(
      async () => {
        const result = await db.select().from(no_show_rules);

        return result;
      },
      "Erro ao executar getAll",
      "NoShowRole/noShowRole.repository.ts/create",
    );
  }

  public update(noShowRole_id: number, data: UpdateNoShowRole): Promise<NoShowRole> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(no_show_rules)
          .set(data)
          .where(eq(no_show_rules.id, noShowRole_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "NoShowRole/noShowRole.repository.ts/create",
    );
  }

  public delete(noShowRole_id: number) {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(no_show_rules)
          .where(eq(no_show_rules.id, noShowRole_id))
          .returning();

        return result[0];
      },
      "Erro ao executar delete",
      "NoShowRole/noShowRole.repository.ts/create",
    );
  }
}
