import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { InsertClient, Client, UpdateClient } from "./dtos/client.dto.type";
import { ClientRepository } from "./client.repository";

export class ClientService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: ClientRepository,
  ) {}

  public create(data: InsertClient): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data);

        return result;
      },
      "Erro ao executar create",
      "Clients/client.service.ts/create",
    );
  }

  public getById(client_id: string): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(client_id);

        return result;
      },
      "Erro ao executar getById",
      "Clients/client.service.ts/getById",
    );
  }

  public getAll(): Promise<Client[]> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getAll();

        return result;
      },
      "Erro ao executar getAll",
      "Clients/client.service.ts/getAll",
    );
  }

  public update(client_id: string, data: UpdateClient): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(client_id, data);

        return result;
      },
      "Erro ao executar update",
      "Clients/client.service.ts/update",
    );
  }

  public delete(client_id: string): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(client_id);

        return result;
      },
      "Erro ao executar delete",
      "Clients/client.service.ts/delete",
    );
  }
}
