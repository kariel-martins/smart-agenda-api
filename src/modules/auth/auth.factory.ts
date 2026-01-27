import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { CryptoService } from "../../share/services/CryptoService";
import { JwtService } from "../../share/services/JWTService";
import { Masks } from "../../share/utils/masks";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

export function makeAuthService() {
  const execute = new ExecuteHandler(true, "Auth");
  const repo = new AuthRepository(execute);

  const crypt = new CryptoService();
  const jwtService = new JwtService(env().jwtKey);
  const mask = new Masks();

  return new AuthService(
    execute,
    repo,
    crypt,
    jwtService,
    mask
  );
}
