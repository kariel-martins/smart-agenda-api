import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { professionals } from "../../database/Schemas";
import { InsertProfessional, Professional, UpdateProfessional } from "./dtos/professional.dto.type";

export class ProfessionalRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertProfessional): Promise<Professional> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(professionals).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "Professional/Professional.repository.ts/create",
    );
  }

  public getByIdBusiness(businessId: string): Promise<Professional[]> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(professionals)
          .where(eq(professionals.businesses_id, businessId));

        return result;
      },
      "Erro ao executar getByIdBusiness",
      "Professional/Professional.repository.ts/getByIdBusiness",
    );
  }

  public update(professional_id: number, data: UpdateProfessional): Promise<Professional> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(professionals)
          .set(data)
          .where(eq(professionals.id, professional_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "Professional/Professional.repository.ts/update",
    );
  }

  public delete(professional_id: number) {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(professionals)
          .where(eq(professionals.id, professional_id))
          .returning();

        return result[0];
      },
      "Erro ao executar delete",
      "Professional/Professional.repository.ts/delete",
    );
  }
}
