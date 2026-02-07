import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ICryptoService } from "../../share/services/interfaces/ICryptoService";
import { IJWTService } from "../../share/services/interfaces/IJWTService";
import { UsersRepository } from "./users.repository";
import {
  createUsersData,
} from "./dtos/users.dto.schema";
import { updateUser, User } from "./dtos/users.dto.types";

export class UsersService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: UsersRepository,
    private readonly crypt: ICryptoService,
    private readonly jwt: IJWTService,
  ) {}

  public create(token: string, data: createUsersData): Promise<User> {
    return this.execute.service(
      async () => {
        const payload = await this.jwt.verify(token);
        console.log(payload)

        if (
          !payload ||
          !payload.sub ||
          !payload.scope ||
          payload.purpose !== "ACCESS_TOKEN"
        )
          throw new AppError("Token ausente ou inválido!", 401);

        await this.repo.getUserNotExists(data.email);

        if (!data.confirmPassword || data.password !== data.confirmPassword) {
          throw new AppError("Senhas não coincidem!", 400);
        }

        const password_hash = await this.crypt.hashText(data.password);

        const result = await this.repo.create({ password_hash, business_id: payload.scope, ...data });
        return result;
      },
      "Erro ao executar create",
      "users/service/users.service/create",
    );
  }

 public getById(user_id: string): Promise<User> {
    return this.execute.service(
      async () => {
        
        const result = await this.repo.getById(user_id);

        return result;
      },
      "Erro ao executar getAll",
      "users/users.service.ts/getAll",
    );
  }

 public getAll(token: string): Promise<User[]> {
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

        const result = await this.repo.getAll(jwtToken.scope);

        return result;
      },
      "Erro ao executar getAll",
      "users/users.service.ts/getAll",
    );
  }

  public update(user_id: string, data: updateUser): Promise<User> {
    return this.execute.service(
      async () => {

          const result = await this.repo.update(user_id, data);

        return result;
      },
      "Erro ao executar update",
      "users/users.service.ts/update",
    );
  }

  public delete(user_id: string): Promise<{message: string}> {
    return this.execute.service(
      async () => {
        
        await this.repo.delete(user_id);

        return { message: "Funcionário removido com sucesso!"};
      },
      "Erro ao executar delete",
      "users/users.service.ts/delete",
    );
  }
}
