import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { Masks } from "../../share/utils/masks";
import { InsertUsers, registerUserData, Users } from "./dtos/users.dto.type";
import { UserRepository } from "./user.repository";

export class UserService {
  private mask = new Masks();

  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: UserRepository,
  ) {}

  public RegisterUser(
    data: registerUserData,
  ): Promise<Omit<Users, "password_hash">> {
    return this.execute.service(
      async () => {
        if (data.password !== data.comfirmPassword) throw new AppError("Password não coincidem")
        const password_hash = data.password
        const { password_hash: password, email, ...rest } = await this.repo.create({password_hash, ...data});
        const result = {
          email: this.mask.email(email),
          ...rest,
        };
        return result;
      },
      "Erro ao executar RegisterUser",
      "users/service/user.service/RegisterUser",
    );
  }
}
