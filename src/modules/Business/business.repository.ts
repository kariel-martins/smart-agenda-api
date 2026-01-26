import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { businesses } from "../../database/Schemas";
import {
  Business,
  InsertBusiness,
  UpdateBusiness,
} from "./dtos/business.dto.types";

export class BusinessRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertBusiness): Promise<Business> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(businesses).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "Business/business.repository.ts/create",
    );
  }

  public getById(business_id: string): Promise<Business> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(businesses)
          .where(eq(businesses.id, business_id));

        return result[0];
      },
      "Erro ao executar getById",
      "Business/business.repository.ts/getById",
    );
  }

  public getAll(): Promise<Business[]> {
    return this.execute.repository(
      async () => {
        const result = await db.select().from(businesses);

        return result;
      },
      "Erro ao executar getAll",
      "Business/business.repository.ts/getAll",
    );
  }

  public update(business_id: string, data: UpdateBusiness): Promise<Business> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(businesses)
          .set(data)
          .where(eq(businesses.id, business_id))
          .returning();

        return result[0];
      },
      "Erro ao executar update",
      "Business/business.repository.ts/update",
    );
  }

  public delete(business_id: string) {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(businesses)
          .where(eq(businesses.id, business_id))
          .returning();

        return result[0];
      },
      "Erro ao executar delete",
      "Business/business.repository.ts/delete",
    );
  }
}
