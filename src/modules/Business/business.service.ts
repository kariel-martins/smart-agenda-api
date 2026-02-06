import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { IJWTService } from "../../share/services/interfaces/IJWTService";
import { BusinessRepository } from "./business.repository";
import { Business, UpdateBusiness } from "./dtos/business.dto.types";

export class BusinessService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: BusinessRepository,
    private readonly jwt: IJWTService,
  ) {}

  public getById(token: string): Promise<Business> {
    return this.execute.service(
      async () => {
        const jwtToken = await this.jwt.verify(token)

         if (
          !jwtToken ||
          !jwtToken.sub ||
          !jwtToken.scope ||
          jwtToken.purpose !== "ACCESS_TOKEN"
        ) {
          throw new AppError("Token ausente ou inválido!", 401);
        }

        const result = await this.repo.getById(jwtToken.scope);

        return result;
      },
      "Erro ao executar getById",
      "Business/business.service.ts/getById",
    );
  }

  public update(token: string, data: UpdateBusiness): Promise<Business> {
    return this.execute.service(
      async () => {
        const jwtToken = await this.jwt.verify(token)

         if (
          !jwtToken ||
          !jwtToken.sub ||
          !jwtToken.scope ||
          jwtToken.purpose !== "ACCESS_TOKEN"
        ) {
          throw new AppError("Token ausente ou inválido!", 401);
        }
        
        const result = await this.repo.update(jwtToken.scope, data);

        return result;
      },
      "Erro ao executar update",
      "Business/business.service.ts/update",
    );
  }
}
