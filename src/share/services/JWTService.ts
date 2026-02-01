import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "../../core/errors/AppError";
import { IJWTService } from "./interfaces/IJWTService";
import { IJwtData } from "./types/JWTService";

export class JwtService implements IJWTService {
  constructor(private readonly jwtKey: string) {}

  async sign(
    data: IJwtData,
    expiresIn: SignOptions["expiresIn"],
  ): Promise<string> {
    try {
      return jwt.sign(data, this.jwtKey, {
        expiresIn,
        issuer: "auth-api",
        audience: "web-client",
      });
    } catch {
      throw new AppError("Erro ao gerar token", 500, true, "JwtService.sign");
    }
  }

  async verify(token: string): Promise<IJwtData> {
    try {
      const decoded = jwt.verify(token, this.jwtKey);

      if (typeof decoded === "string") {
        throw new AppError("Invalid token", 401);
      }

      return decoded as IJwtData;
    } catch (error) {
      throw new AppError(
        "Token inválido ou expirado",
        401,
        true,
        "JwtService.verify",
      );
    }
  }
}
