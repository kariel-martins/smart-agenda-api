import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { ICryptoService } from "../../share/services/interfaces/ICryptoService";
import { IJWTService } from "../../share/services/interfaces/IJWTService";
import { Masks } from "../../share/utils/masks";
import { BusinessRepository } from "../Business/business.repository";
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
    private readonly businessRepo: BusinessRepository,
    private readonly crypt: ICryptoService,
    private readonly jwtService: IJWTService,
    private readonly mask: Masks,
  ) {}

  public registerUser(
    data: createUsersData,
  ): Promise<{
    role: string | null;
    businessId: string;
    refreshToken: string;
    accessToken: string;
  }> {
    return this.execute.service(
      async () => {
        await this.repo.getUserNotExists(data.email);

        if (data.password !== data.confirmPassword)
          throw new AppError("Senhas não coincidem");

        const password_hash = await this.crypt.hashText(data.password);
        const refreshToken = crypto.randomUUID();
        const refreshTokenHash = await this.crypt.hashText(refreshToken);

        const { userData, businessData } = await this.repo.create({
          password_hash,
          tokenRefresh: refreshTokenHash,
          ...data,
        });

        const accessToken = await this.jwtService.sign(
          {
            purpose: "ACCESS_TOKEN",
            scope: crypto.randomUUID(),
            sub: userData.id,
          },
          15,
        );

        return {
          role: userData.role,
          businessId: businessData.id,
          refreshToken,
          accessToken,
        };
      },
      "Erro ao executar registerUser",
      "auth/service/auth.service/registerUser",
    );
  }

  public login(data: loginData): Promise<tokensWithUserAndBusiness> {
    return this.execute.service(
      async () => {
        const { password_hash, email, ...rest } = await this.repo.getByEmail(
          data.email,
        );

        const hasBusiness = await this.businessRepo.getById(rest.business_id);

        const isValid = await this.crypt.verifyText(
          data.password,
          password_hash,
        );

        if (!isValid) throw new AppError("Senha inválida");

        const refreshToken = crypto.randomUUID();
        const refreshTokenHash = await this.crypt.hashText(refreshToken);

        await this.repo.createToken({
          user_id: rest.id,
          token_hash: refreshTokenHash,
        });

        const accessToken = await this.jwtService.sign(
          { purpose: "ACCESS_TOKEN", scope: crypto.randomUUID(), sub: rest.id },
          15,
        );

        const result = {
          refresh_token: refreshToken,
          token: accessToken,
          usersData: {
            email: this.mask.email(email),
            ...rest,
          },
          businessData: hasBusiness,
        } as tokensWithUserAndBusiness;
        return result;
      },
      "Erro ao executar login",
      "auth/service/auth.service/login",
    );
  }

  public refresh(
    refresh_token: string,
    user_id: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.execute.service(
      async () => {
        let validToken = null;
        const tokens = await this.repo.getTokenRefresh(user_id);

        for (const token of tokens) {
          const match = await this.crypt.verifyText(
            refresh_token,
            token.token_hash,
          );

          if (match && !token.revoked) {
            validToken = token;
            break;
          }
        }

        if (!validToken) throw new AppError("Refresh token inválido", 401);

        await this.repo.updateRefreshToken(validToken?.id, {
          revoked: true,
        });

        const tokenRefresh = crypto.randomUUID();
        const newRefreshToken = await this.crypt.hashText(tokenRefresh);

        await this.repo.createToken({ user_id, token_hash: newRefreshToken });

        const newAccessToken = await this.jwtService.sign(
          { purpose: "ACCESS_TOKEN", scope: crypto.randomUUID(), sub: user_id },
          15,
        );

        return { accessToken: newAccessToken, refreshToken: tokenRefresh };
      },
      "Erro ao executar refresh",
      "auth/service/auth.service/refresh",
    );
  }

  public forgotPassword(email: string): Promise<{ message: string }> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getByEmail(email);

        const token = await this.jwtService.sign(
          {
            purpose: "FORGOT_PASSWORD",
            scope: crypto.randomUUID(),
            sub: result.id,
          },
          15,
        );

        //incompleto adicionar serviço de email

        return { message: "Email enviar com sucesso!" };
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

        if (!isValidToken) throw new AppError("Token invalid!", 404);
        if (!isValidToken.sub)
          throw new AppError("Id do usuário não encotrado", 500);
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
