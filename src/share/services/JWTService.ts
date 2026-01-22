import jwt from "jsonwebtoken";
import { env } from "../../config/env";

interface IJwtData {
  scope: string;
  purpose: string;
  sub?: string;
}

const { jwtKey } = env();

export class JwtService {
  public async sign(
    data: IJwtData,
    expireInMinutes = 15,
  ): Promise<
    string | "INVALID_TOKEN" | "JWT_SECRET_NOT_FOUND" | "ERRO_TOKEN_SIGN"
  > {
    if (!jwtKey) return "JWT_SECRET_NOT_FOUND";
    try {
      const result = jwt.sign(data, jwtKey, {
        expiresIn: `${expireInMinutes}m`,
      });
      return result;
    } catch {
      return "ERRO_TOKEN_SIGN";
    }
  }

  public async verify(
    token: string,
  ): Promise<
    IJwtData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" | "ERRO_TOKEN_VERIFY"
  > {
    if (!jwtKey) return "JWT_SECRET_NOT_FOUND";
    try {
      const decoded = jwt.verify(token, jwtKey);
      if (typeof decoded === "string") {
        return "INVALID_TOKEN";
      }
      return decoded as IJwtData;
    } catch {
      return "ERRO_TOKEN_VERIFY";
    }
  }
}
