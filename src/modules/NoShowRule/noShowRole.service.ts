import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { NoShowRoleRepository } from "./noShowRole.repository";
import {
  NoShowRole,
  InsertNoShowRole,
  UpdateNoShowRole,
} from "./dtos/noShowRole.dto.type";
import { AppError } from "../../core/errors/AppError";
import { IJWTService } from "../../share/services/interfaces/IJWTService";

export class NoShowRoleService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: NoShowRoleRepository,
    private readonly jwt: IJWTService,
  ) {}

  public create(token: string, data: InsertNoShowRole): Promise<any> {
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

        const result = await this.repo.create({
          ...data,
          businesses_id: jwtToken.scope,
        });

        return result;
      },
      "Erro ao executar create",
      "NoShowRole/noShowRole.service.ts/create",
    );
  }

  public getById(token: string): Promise<NoShowRole[]> {
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
      "NoShowRole/noShowRole.service.ts/getById",
    );
  }

  public update(
    noShowRule_id: number,
    data: UpdateNoShowRole,
  ): Promise<NoShowRole> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(noShowRule_id, data);

        return result;
      },
      "Erro ao executar update",
      "NoShowRole/noShowRole.service.ts/update",
    );
  }

  public delete(noShowRule_id: number): Promise<NoShowRole> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(noShowRule_id);
        return result
      },
      "Erro ao executar delete",
      "NoShowRole/noShowRole.service.ts/delete",
    );
  }
}
