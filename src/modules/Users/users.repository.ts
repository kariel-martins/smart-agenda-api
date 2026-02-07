import { and, eq, ne } from "drizzle-orm";
import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { users } from "../../database/Schemas";
import {
  InsertUser,
  updateUser,
  User,
} from "./dtos/users.dto.types";

export class UsersRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertUser): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(users).values(data).returning()

        return result[0]
      },
      "Foi possível criar o fucionário!",
      "users/users.repository/create",
    );
  }


  public getAll(business_id: string): Promise<User[]> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.business_id, business_id))

        return result;
      },
      "Não há fucionarios registrados!",
      "users/users.repository/getAll",
    );
  }

  public getById(user_id: string): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.id, user_id))

        return result[0];
      },
      "Funcionarios não encontrado!",
      "users/users.repository/getById",
    );
  }

  public async getUserNotExists(email: string): Promise<void> {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result) {
      throw new AppError(
        "Usuário já existe!",
        409,
        true,
        "users/repositories/users.repository/getUserNotExists",
      );
    }
  }

  public update(user_id: string, data: updateUser): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(users)
          .set(data)
          .where(eq(users.id, user_id))
          .returning();

        return result[0];
      },
      "Não foi possível atualizar dados do fucionário!",
      "users/users.repository/update",
    );
  }
   public delete(user_id: string): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await db
          .delete(users).where(and(eq(users.id, user_id), ne(users.user_role, "admin"))).returning()

        return result[0];
      },
      "Não foi possível remove o funcionário!",
      "users/users.repository/delete",
    );
  }
}
