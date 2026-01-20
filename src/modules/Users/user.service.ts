import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { Masks } from "../../share/utils/masks";
import { InsertUsers, Users } from "./dtos/users.dto.type";
import { UserRepository } from "./user.repository";

export class UserService {
  private readonly execute: ExecuteHandler;
  private readonly repo: UserRepository;
  private mask = new Masks()

  constructor() {
    this.execute = new ExecuteHandler(true, "User");
    this.repo = new UserRepository(this.execute);
  }

  public RegisterUser(data:InsertUsers): Promise<Omit<Users, "password_hash">> {
    return this.execute.service(
      async () => {
        const {password_hash, email, ...rest} = await this.repo.create(data)
        const result = {
            email: this.mask.email(email),
            ...rest
        }
        return result
      },
      "Erro ao executar RegisterUser",
      "users/service/user.service/RegisterUser",
    );
  }
}
