import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { InsertService, Service, UpdateService } from "./dtos/service.dto.type";
import { ServiceRepository } from "./service.repository";

export class ServiceService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: ServiceRepository,
  ) {}

  public create(data: InsertService): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data);

        return result;
      },
      "Erro ao executar create",
      "Service/service.service.ts/create",
    );
  }

  public getById(service_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(service_id);

        return result;
      },
      "Erro ao executar getById",
      "Service/service.service.ts/getById",
    );
  }

  public getAll(): Promise<Service[]> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getAll();

        return result;
      },
      "Erro ao executar getAll",
      "Service/service.service.ts/getAll",
    );
  }

  public update(service_id: number, data: UpdateService): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(service_id, data);

        return result;
      },
      "Erro ao executar update",
      "Service/service.service.ts/update",
    );
  }

  public delete(service_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(service_id);

        return result;
      },
      "Erro ao executar delete",
      "Service/service.service.ts/delete",
    );
  }
}
