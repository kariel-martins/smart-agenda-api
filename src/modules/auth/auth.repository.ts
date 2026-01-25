import { and, eq, lt } from "drizzle-orm";
import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { refresh_tokens, users } from "../../database/Schemas";
import {
  InsertTokenRefresh,
  InsertUser,
  tokenRefresh,
  UpdateTokenRefresh,
  updateUser,
  User,
} from "./dtos/auth.dto.types";

export class AuthRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: InsertUser): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(users).values(data).returning();
        return result[0];
      },
      "Erro ao executar create",
      "auth/auth.repository/create",
    );
  }

  public createToken(data: InsertTokenRefresh): Promise<tokenRefresh> {
    return this.execute.repository(
      async () => {
        const result = await db.insert(refresh_tokens).values(data).returning();
        return result[0];
      },
      "Erro ao executar createToken",
      "auth/auth.repository/createToken",
    );
  }
  public getByEmail(email: string): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        return result[0];
      },
      "Erro ao executar getByEmail",
      "auth/auth.repository/getByEmail",
    );
  }

  public async getUserNotExists(email: string): Promise<void | AppError> {
    try {
      const [result] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (result)
        throw new AppError(
          "Usuário já existe",
          400,
          true,
          "auth/repositories/auth.respository/getUserNotExists",
        );
    } catch (error) {
      if (error instanceof AppError) return error;
      throw new AppError(
        "Erro ao verificar o usuário",
        500,
        true,
        "auth/repositories/auth.respository/getUserNotExists",
      );
    }
  }

  public async getTokenRefresh(user_id: string) {
    return this.execute.repository(
      async () => {

        const result = await db
          .select()
          .from(refresh_tokens)
          .where(
            and(
              eq(refresh_tokens.user_id, user_id),
              eq(refresh_tokens.revoked, false),
              lt(refresh_tokens.expires_at, new Date())
            ),
          );

        return result;
      },
      "Erro ao executar getTokenRefresh",
      "auth/auth.repository/getTokenRefresh",
    );
  }

  public updateRefreshToken(refreshToken_id: string, data: UpdateTokenRefresh): Promise<tokenRefresh> {
    return this.execute.repository(
      async () => {
        const result = await db.update(refresh_tokens).set(data).where(eq(refresh_tokens.id, refreshToken_id)).returning()

        return result[0]
      },
      "Erro ao executar updateRefreshToken",
      "auth/auth.repository/updateRefreshToken",
    )
  }

  public update( user_id: string, data: updateUser ): Promise<User> {
    return this.execute.repository(
      async () => {
        const result = await db.update(users).set(data).where(eq(users.id, user_id)).returning()

        return result[0]
      },
      "Erro ao executar update",
      "auth/auth.repository/update",
    )
  }
}
