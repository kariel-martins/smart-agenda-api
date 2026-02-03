import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ICryptoService } from "../../share/services/interfaces/ICryptoService";
import { IJWTService } from "../../share/services/interfaces/IJWTService";
import { Masks } from "../../share/utils/masks";
import { AuthRepository } from "./auth.repository";
import {
  createUsersData,
  loginData,
  resetPasswordData,
} from "./dtos/auth.dto.schema";
import { tokensWithUserAndBusiness } from "./dtos/auth.dto.types";

export class AuthService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: AuthRepository,
    private readonly crypt: ICryptoService,
    private readonly jwtService: IJWTService,
    private readonly mask: Masks,
  ) {}

  public registerUser(
    data: createUsersData,
  ): Promise<tokensWithUserAndBusiness> {
    return this.execute.service(
      async () => {

        await this.repo.getUserNotExists(data.email);

       if (!data.confirmPassword || data.password !== data.confirmPassword) {
  throw new AppError("Senhas não coincidem", 400);
}

        const password_hash = await this.crypt.hashText(data.password);
        const refreshToken = crypto.randomUUID();
        const refreshTokenHash = await this.crypt.hashText(refreshToken);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);

        const { users: userData, businesses: businessData } = await this.repo.create({
          password_hash,
          tokenRefresh: refreshTokenHash,
          ...data,
        });

        const refreshTokenJwt = await this.jwtService.sign(
          {
            purpose: "REFRESH_TOKEN",
            scope: refreshToken,
            sub: userData.id,
          },
          "2d",
        );

        const accessToken = await this.jwtService.sign(
          {
            purpose: "ACCESS_TOKEN",
            scope: crypto.randomUUID(),
            sub: userData.id,
          },
          "15m",
        );
        const { email, ...rest } = userData;
        const result = {
          refresh_token: refreshTokenJwt,
          token: accessToken,
          usersData: {
            email: this.mask.email(email),
            ...rest,
          },
          businessData: businessData,
        } as tokensWithUserAndBusiness;
        return result;
      },
      "Erro ao executar registerUser",
      "auth/service/auth.service/registerUser",
    );
  }

  public login(data: loginData): Promise<tokensWithUserAndBusiness> {
    return this.execute.service(
      async () => {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);

        const { users, businesses } = await this.repo.getByEmail(
          data.email,
        );

        const {password_hash, email, ...restUsers} = users

        const isValid = await this.crypt.verifyText(
          data.password,
          password_hash,
        );

        if (!isValid) throw new AppError("Senha inválida");

        const refreshToken = crypto.randomUUID();
        const refreshTokenHash = await this.crypt.hashText(refreshToken);

        await this.repo.createToken({
          user_id: restUsers.id,
          token_hash: refreshTokenHash,
          expires_at: expiresAt,
        });

        const refreshTokenJwt = await this.jwtService.sign(
          {
            purpose: "REFRESH_TOKEN",
            scope: refreshToken,
            sub: restUsers.id,
          },
          "2d",
        );

        const accessToken = await this.jwtService.sign(
          { purpose: "ACCESS_TOKEN", scope: crypto.randomUUID(), sub: restUsers.id },
          "15m",
        );

        const result = {
          refresh_token: refreshTokenJwt,
          token: accessToken,
          usersData: {
            email: this.mask.email(email),
            ...restUsers,
          },
          businessData: businesses,
        } as tokensWithUserAndBusiness;
        return result;
      },
      "Erro ao executar login",
      "auth/service/auth.service/login",
    );
  }

  public refresh(
    refresh_token: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.execute.service(
      async () => {
        let validToken = null;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 2);

        if (!refresh_token) throw new AppError("Token ausente ou inválido!");

        const jwtToken = await this.jwtService.verify(refresh_token);

        if (
          !jwtToken ||
          !jwtToken.sub ||
          !jwtToken.scope ||
          jwtToken.purpose !== "REFRESH_TOKEN"
        ) {
          throw new AppError("Token ausente ou inválido!", 401);
        }

        const tokens = await this.repo.getTokenRefresh(jwtToken.sub);

        for (const token of tokens) {
          const match = await this.crypt.verifyText(
            jwtToken.scope,
            token.token_hash,
          );

          if (match) {
            if (token.revoked) {
              await this.repo.revokeAllUserTokens(jwtToken.sub);
              throw new AppError("Sessão comprometida", 401);
            }

            validToken = token;
            break;
          }
        }

        if (!validToken) throw new AppError("Refresh token inválido", 401);

        const tokenRefresh = crypto.randomUUID();
        const newRefreshToken = await this.crypt.hashText(tokenRefresh);

        const newTokenRefresh = await this.repo.createToken({
          user_id: jwtToken.sub,
          token_hash: newRefreshToken,
          expires_at: expiresAt,
        });

        await this.repo.updateRefreshToken(validToken?.id, {
          revoked: true,
        });

        const refreshTokenJwt = await this.jwtService.sign(
          {
            purpose: "REFRESH_TOKEN",
            scope: tokenRefresh,
            sub: newTokenRefresh.user_id,
          },
          "2d",
        );

        const newAccessToken = await this.jwtService.sign(
          {
            purpose: "ACCESS_TOKEN",
            scope: crypto.randomUUID(),
            sub: jwtToken.sub,
          },
          "15m",
        );

        return { accessToken: newAccessToken, refreshToken: refreshTokenJwt };
      },
      "Erro ao executar refresh",
      "auth/service/auth.service/refresh",
    );
  }

  public forgotPassword(email: string): Promise<{ message: string, token: string }> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getByEmail(email);

        const token = await this.jwtService.sign(
          {
            purpose: "FORGOT_PASSWORD",
            sub: result.users.id,
          },
          "15m",
        );

        //incompleto adicionar serviço de email

        return { message: "Email enviar com sucesso!", token};
      },
      "Erro ao executar forgotPassword",
      "auth/service/auth.service/forgotPassword",
    );
  }

  public resetPassword(
    token: string,
    data: resetPasswordData,
  ): Promise<{ message: string }> {
    return this.execute.service(
      async () => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword)
          throw new AppError("Senhas não coincidem!");
    

        const isValidToken = await this.jwtService.verify(token);

        if (!isValidToken || !isValidToken.sub || isValidToken.purpose !== "FORGOT_PASSWORD") throw new AppError("Token inválido ou ausente", 401);

        const password_hash = await this.crypt.hashText(password);
        await this.repo.update(isValidToken.sub, {
          password_hash,
        });

        //incompleto adicionar serviço de email

        return { message: "Senha atualizada com sucesso!" };
      },
      "Erro ao executar resetPassword",
      "auth/service/auth.service/resetPassword",
    );
  }
}
