import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { CryptoService } from "../../share/services/CryptoService";
import { JwtService } from "../../share/services/JWTService";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

export function makeUsersService() {
  const execute = new ExecuteHandler(true, "Auth");
  const repo = new UsersRepository(execute)

  const crypt = new CryptoService();
  const jwtService = new JwtService(env().jwtKey);

  return new UsersService(
    execute,
    repo,
    crypt,
    jwtService,
  );
}
