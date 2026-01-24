import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { CryptoService } from "../../share/services/CryptoService";
import { JwtService } from "../../share/services/JWTService";
import { Masks } from "../../share/utils/masks";
import { AuthRepository } from "./auth.repository";
import { createUsersData, loginData } from "./dtos/auth.dto.schema";
import { tokensWithUser, UserOmitPassword } from "./dtos/auth.dto.types";

export class AuthService {
  private crypt = new CryptoService();
  private mask = new Masks();
  private jwtService = new JwtService();

  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: AuthRepository,
  ) {}

  public RegisterUser(data: createUsersData): Promise<UserOmitPassword> {
    return this.execute.service(
      async () => {
        if (data.password !== data.comfirmPassword)
          throw new AppError("Senhas não coencidem");

        const password_hash = await this.crypt.hashText(data.password);
        const {
          password_hash: password,
          email,
          ...rest
        } = await this.repo.create({ password_hash, ...data });

        return { email: this.mask.email(email), ...rest };
      },
      "Erro ao executar RegisterUser",
      "auth/service/auth.service/RegisterUser",
    );
  }

  public login(data: loginData): Promise<tokensWithUser> {
    return this.execute.service(
      async () => {
        const { password_hash, email, ...rest } = await this.repo.getByEmail(
          data.email,
        );

        const isValid = this.crypt.verifyText(data.password, password_hash);

        if (!isValid) throw new AppError("Senha inválida");

        const refreshToken = crypto.randomUUID();
        const refreshTokenHash = String(this.crypt.hashText(refreshToken));

        await this.repo.createToken({
          user_id: rest.id,
          token_hash: refreshTokenHash,
        });

        const accessToken = await this.jwtService.sign(
          { purpose: "ACCESS_TOKEN", scope: crypto.randomUUID() },
          15,
        );

        const result = {
          refresh_token: refreshToken,
          token: accessToken,
          users: {
            email: this.mask.email(email),
            ...rest,
          },
        } as tokensWithUser;
        return result;
      },
      "Erro ao executar login",
      "auth/service/auth.service/login",
    );
  }

  public refresh(
    refresh_token: string,
    user_id: string,
  ): Promise<{ accessToken: string, refreshToken: string }> {
    return this.execute.service(
      async () => {
        let validToken = null;
        const tokens = await this.repo.getTokenRefresh(user_id);

        for (const token of tokens) {
          const match = await this.crypt.verifyText(
            refresh_token,
            token.token_hash,
          );

          if (match) {
            validToken = token;
            break;
          }
        }

        if (!validToken) throw new AppError("Refresh token inválido", 500);

        await this.repo.updateRefreshToken(validToken?.id, {
          revoked: true,
        });

        const newRefreshToken = await this.crypt.hashText(crypto.randomUUID());

        await this.repo.createToken({ user_id, token_hash: newRefreshToken });

        const newAccessToken = await this.jwtService.sign(
          { purpose: "ACCESS_TOKEN", scope: crypto.randomUUID() },
          15,
        );

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
      },
      "Erro ao executar refresh",
      "auth/service/auth.service/refresh",
    );
  }
}
