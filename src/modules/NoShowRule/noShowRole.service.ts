import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { NoShowRoleRepository } from "./noShowRole.repository";
import { NoShowRole, InsertNoShowRole, UpdateNoShowRole } from "./dtos/noShowRole.dto.type";

export class NoShowRoleService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: NoShowRoleRepository,
  ) {}

  public create(data: InsertNoShowRole): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data);

        return result;
      },
      "Erro ao executar create",
      "NoShowRole/noShowRole.service.ts/create",
    );
  }

  public getById(professional_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(professional_id);

        return result;
      },
      "Erro ao executar getById",
      "NoShowRole/noShowRole.service.ts/getById",
    );
  }

  public getAll(): Promise<NoShowRole[]> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getAll();

        return result;
      },
      "Erro ao executar getAll",
      "NoShowRole/noShowRole.service.ts/getAll",
    );
  }

  public update(professional_id: number, data: UpdateNoShowRole): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(professional_id, data);

        return result;
      },
      "Erro ao executar update",
      "NoShowRole/noShowRole.service.ts/update",
    );
  }

  public delete(professional_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(professional_id);

        return result;
      },
      "Erro ao executar delete",
      "NoShowRole/noShowRole.service.ts/delete",
    );
  }
}
