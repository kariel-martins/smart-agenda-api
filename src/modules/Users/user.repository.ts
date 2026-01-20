import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { users } from "../../database/Schemas";
import { InsertUsers, Users } from "./dtos/users.dto.type";

export class UserRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertUsers): Promise<Users> {
    return this.execute.repository(
      async () => {
        const user = await db.insert(users).values(data).returning()
        return user[0]
      },
      "Erro ao executar create",
      "users/repository/user.repository/create",
    );
  }

  public getByEmail() {}

  public getByEmailNotExists() {}

  public update() {}
}
