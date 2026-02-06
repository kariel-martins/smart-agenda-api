import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { InsertClient, Client, UpdateClient } from "./dtos/client.dto.type";
import { ClientRepository } from "./client.repository";
import { AppError } from "../../core/errors/AppError";
import { IJWTService } from "../../share/services/interfaces/IJWTService";

export class ClientService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: ClientRepository,
    private readonly jwt: IJWTService,
  ) {}

  public create(token: string, data: InsertClient): Promise<any> {
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

        const result = await this.repo.create({...data, businesses_id: jwtToken.scope});

        return result;
      },
      "Erro ao executar create",
      "Clients/client.service.ts/create",
    );
  }

  public getById(token: string): Promise<Client[]> {
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
      "Clients/client.service.ts/getById",
    );
  }

  public update(client_id: string, data: UpdateClient): Promise<Client> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(client_id, data);

        return result;
      },
      "Erro ao executar update",
      "Clients/client.service.ts/update",
    );
  }

  public delete(client_id: string): Promise<void> {
    return this.execute.service(
      async () => {
        await this.repo.delete(client_id);
      },
      "Erro ao executar delete",
      "Clients/client.service.ts/delete",
    );
  }
}
