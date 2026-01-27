import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { InsertProfessional, Professional, UpdateProfessional } from "./dtos/professional.dto.type";
import { ProfessionalRepository } from "./professional.repository";

export class ProfessionalService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: ProfessionalRepository,
  ) {}

  public create(data: InsertProfessional): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data);

        return result;
      },
      "Erro ao executar create",
      "Professional/professional.service.ts/create",
    );
  }

  public getById(professional_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(professional_id);

        return result;
      },
      "Erro ao executar getById",
      "Professional/professional.service.ts/getById",
    );
  }

  public getAll(): Promise<Professional[]> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getAll();

        return result;
      },
      "Erro ao executar getAll",
      "Professional/professional.service.ts/getAll",
    );
  }

  public update(professional_id: number, data: UpdateProfessional): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(professional_id, data);

        return result;
      },
      "Erro ao executar update",
      "Professional/professional.service.ts/update",
    );
  }

  public delete(professional_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(professional_id);

        return result;
      },
      "Erro ao executar delete",
      "Professional/professional.service.ts/delete",
    );
  }
}
