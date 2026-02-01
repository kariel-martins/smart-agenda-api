import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { professionalData } from "./dtos/professional.dto.schema";
import { InsertProfessional, Professional, UpdateProfessional } from "./dtos/professional.dto.type";
import { ProfessionalRepository } from "./professional.repository";

export class ProfessionalService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: ProfessionalRepository,
  ) {}

  public create(businessId: string, data: professionalData): Promise<any> {
    return this.execute.service(
      async () => {
        const allowedRoles = ["ADMIN", "MANAGER"]
        if (!businessId) throw new AppError("businessId ausente ou inválido")
        if (!allowedRoles.includes(data.role)) throw new AppError("Usuário não autorizado para ação!")

        const result = await this.repo.create({businesses_id: businessId, ...data});

        return result;
      },
      "Erro ao executar create",
      "Professional/professional.service.ts/create",
    );
  }

  public getByIdBusiness(businessId: string): Promise<Professional[]> {
    return this.execute.service(
      async () => {
        if (!businessId) throw new AppError("businessId ausente ou inválido")

        const result = await this.repo.getByIdBusiness(businessId);

        return result;
      },
      "Erro ao executar getByIdBusiness",
      "Professional/professional.service.ts/getByIdBusiness",
    );
  }

  public update(professional_id: number, data: professionalData): Promise<any> {
    return this.execute.service(
      async () => {
        const allowedRoles = ["ADMIN", "MANAGER"]
        if (!allowedRoles.includes(data.role)) throw new AppError("Usuário não autorizado para ação!")

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
