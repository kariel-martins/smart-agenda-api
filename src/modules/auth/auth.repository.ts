import { and, eq, gt, lt } from "drizzle-orm";
import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { db } from "../../database/Client";
import { businesses, refresh_tokens, users } from "../../database/Schemas";
import {
  CreateUserWithBusiness,
  InsertTokenRefresh,
  tokenRefresh,
  UpdateTokenRefresh,
  updateUser,
  User,
  UserAndBusiness,
} from "./dtos/auth.dto.types";

export class AuthRepository {
  constructor(private readonly execute: ExecuteHandler) {}

  public create(data: CreateUserWithBusiness): Promise<UserAndBusiness> {
    return this.execute.repository(
      async () => {
        return await db.transaction(async (tx) => {
          const [business] = await tx
            .insert(businesses)
            .values({
              email: data.email,
              name: data.nameBusiness,
              phone: data.phone,
              active: true,
            })
            .returning();

          const [user] = await tx
            .insert(users)
            .values({
              email: data.email,
              name: data.name,
              password_hash: data.password_hash,
              user_role: "admin",
              business_id: business.id,
            })
            .returning();

          const [tokenRefresh] = await tx
            .insert(refresh_tokens)
            .values({
              token_hash: data.tokenRefresh,
              user_id: user.id,
            })
            .returning();

          return { users: user, businesses: business, tokenRefresh };
        });
      },
      "Erro ao executar create",
      "auth/auth.repository/create",
    );
  }

  public createToken(data: InsertTokenRefresh): Promise<tokenRefresh> {
    return this.execute.repository(
      async () => {
        const result = await db
          .insert(refresh_tokens)
          .values({
            expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
            ...data,
          })
          .returning();
        return result[0];
      },
      "Erro ao executar createToken",
      "auth/auth.repository/createToken",
    );
  }

  public getByEmail(email: string): Promise<UserAndBusiness> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, email)).innerJoin(businesses, eq(businesses.id, users.business_id));

        return result[0];
      },
      "Usuário não encontrado",
      "auth/auth.repository/getByEmail",
    );
  }

  public async getUserNotExists(email: string): Promise<void> {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result) {
      throw new AppError(
        "Usuário já existe",
        409,
        true,
        "auth/repositories/auth.repository/getUserNotExists",
      );
    }
  }

  public async getTokenRefresh(user_id: string): Promise<tokenRefresh[]> {
    return this.execute.repository(
      async () => {
        const result = await db
          .select()
          .from(refresh_tokens)
          .where(
            and(
              eq(refresh_tokens.user_id, user_id),
              eq(refresh_tokens.revoked, false),
              gt(refresh_tokens.expires_at, new Date()),
            ),
          );
        return result;
      },
      "Erro ao executar getTokenRefresh",
      "auth/auth.repository/getTokenRefresh",
    );
  }

  public updateRefreshToken(
    refreshToken_id: string,
    data: UpdateTokenRefresh,
  ): Promise<tokenRefresh> {
    return this.execute.repository(
      async () => {
        const result = await db
          .update(refresh_tokens)
          .set(data)
          .where(
            and(
              eq(refresh_tokens.id, refreshToken_id),
              eq(refresh_tokens.revoked, false),
            ),
          )
          .returning();

        if (!result.length) {
          throw new AppError("Refresh token já revogado ou inexistente");
        }

        return result[0];
      },
      "Erro ao executar updateRefreshToken",
      "auth/auth.repository/updateRefreshToken",
    );
  }

  public revokeAllUserTokens(user_id: string): Promise<void> {
    return this.execute.repository(
      async () => {
        await db
          .update(refresh_tokens)
          .set({ revoked: true })
          .where(
            and(
              eq(refresh_tokens.user_id, user_id),
              eq(refresh_tokens.revoked, false),
            ),
          );
      },
      "Erro ao executar revokeAllUserTokens",
      "auth/auth.repository/revokeAllUserTokens",
    );
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
      "Erro ao executar update",
      "auth/auth.repository/update",
    );
  }
}
