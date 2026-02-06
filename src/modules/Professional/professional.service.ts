import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { IJWTService } from "../../share/services/interfaces/IJWTService";
import { professionalData } from "./dtos/professional.dto.schema";
import { Professional } from "./dtos/professional.dto.type";
import { ProfessionalRepository } from "./professional.repository";

export class ProfessionalService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: ProfessionalRepository,
    private readonly jwt: IJWTService,
  ) {}

  public create(token: string, data: professionalData): Promise<any> {
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

        const result = await this.repo.create({businesses_id: jwtToken.scope, ...data});

        return result;
      },
      "Erro ao executar create",
      "Professional/professional.service.ts/create",
    );
  }

  public getByIdBusiness(token: string): Promise<Professional[]> {
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

        const result = await this.repo.getByIdBusiness(jwtToken.scope);

        return result;
      },
      "Erro ao executar getByIdBusiness",
      "Professional/professional.service.ts/getByIdBusiness",
    );
  }

  public update(professional_id: number, data: professionalData): Promise<any> {
    return this.execute.service(
      async () => {

          const result = await this.repo.update(professional_id, {name: data.name, specialty: data.specialty});

        return result;
      },
      "Erro ao executar update",
      "Professional/professional.service.ts/update",
    );
  }

  public delete(professional_id: number): Promise<{message: string}> {
    return this.execute.service(
      async () => {
        
        await this.repo.delete(professional_id);

        return { message: "professional deletado com sucesso!"};
      },
      "Erro ao executar delete",
      "Professional/professional.service.ts/delete",
    );
  }
}
