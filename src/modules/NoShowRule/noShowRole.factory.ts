import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { JwtService } from "../../share/services/JWTService";
import { NoShowRoleRepository } from "./noShowRole.repository";
import { NoShowRoleService } from "./noShowRole.service";

export function makeNoShowRoleService() {
  const execute = new ExecuteHandler(true, "Service");
  const repo = new NoShowRoleRepository(execute);
  const jwt = new JwtService(env().jwtKey);
  return new NoShowRoleService(execute, repo, jwt);
}
