import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { JwtService } from "../../share/services/JWTService";
import { ClientRepository } from "./client.repository";
import { ClientService } from "./client.service";

export function makeClientService() {
  const execute = new ExecuteHandler(true, "Client");
  const repo = new ClientRepository(execute);
  const jwt = new JwtService(env().jwtKey);
  return new ClientService(execute, repo, jwt);
}
