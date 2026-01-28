import { eq } from "drizzle-orm";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { businesses } from "../../database/Schemas";
import {
  Business,
  UpdateBusiness,
} from "./dtos/business.dto.types";

export class BusinessRepository {
  constructor(private readonly execute: ExecuteHandler) {}

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
}
