import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { JwtService } from "../../share/services/JWTService";
import { ServiceRepository } from "./service.repository";
import { ServiceService } from "./service.service";

export function makeServiceService() {
  const execute = new ExecuteHandler(true, "Service");
  const repo = new ServiceRepository(execute);
  const jwt = new JwtService(env().jwtKey);
  return new ServiceService(execute, repo, jwt);
}
