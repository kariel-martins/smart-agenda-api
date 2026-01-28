import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { BusinessRepository } from "./business.repository";
import { UpdateBusiness } from "./dtos/business.dto.types";

export class BusinessService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: BusinessRepository,
  ) {}

  public getById(business_id: string): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(business_id);

        return result;
      },
      "Erro ao executar getById",
      "Business/business.service.ts/getById",
    );
  }

  public update(business_id: string, data: UpdateBusiness): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(business_id, data);

        return result;
      },
      "Erro ao executar update",
      "Business/business.service.ts/update",
    );
  }
}
