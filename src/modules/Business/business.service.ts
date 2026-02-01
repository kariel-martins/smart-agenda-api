import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { BusinessRepository } from "./business.repository";
import { Business, UpdateBusiness } from "./dtos/business.dto.types";

export class BusinessService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: BusinessRepository,
  ) {}

  public getById(businessId: string): Promise<Business> {
    return this.execute.service(
      async () => {
        if (!businessId) throw new AppError("Error ao buscar business", 400);

        const result = await this.repo.getById(businessId);

        return result;
      },
      "Erro ao executar getById",
      "Business/business.service.ts/getById",
    );
  }

  public update(businessId: string, data: UpdateBusiness): Promise<Business> {
    return this.execute.service(
      async () => {
        if (!businessId) throw new AppError("Error ao buscar business", 400);
        
        const result = await this.repo.update(businessId, data);

        return result;
      },
      "Erro ao executar update",
      "Business/business.service.ts/update",
    );
  }
}
