import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { BusinessRepository } from "./business.repository";
import { Business, InsertBusiness, UpdateBusiness } from "./dtos/business.dto.types";

export class BusinessService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: BusinessRepository,
  ) {}

  public create(data: InsertBusiness): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data)

        return result
      },
      "Erro ao executar create",
      "Business/business.service.ts/create",
    );
  }

  public getById(business_id: string): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(business_id)

        return result
      },
      "Erro ao executar getById",
      "Business/business.service.ts/getById",
    );
  }

  public getAll(): Promise<Business[]> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getAll()

        return result
      },
      "Erro ao executar getAll",
      "Business/business.service.ts/getAll",
    );
  }

  public update(business_id: string, data: UpdateBusiness): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(business_id, data)

        return result
      },
      "Erro ao executar update",
      "Business/business.service.ts/update",
    );
  }

  public delete(business_id: string): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(business_id)

        return result
      },
      "Erro ao executar delete",
      "Business/business.service.ts/delete",
    );
  }
}
