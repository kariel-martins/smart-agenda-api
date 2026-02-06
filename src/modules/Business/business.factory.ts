import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { JwtService } from "../../share/services/JWTService";
import { BusinessRepository } from "./business.repository";
import { BusinessService } from "./business.service";

export function makeBusinessService() {
  const execute = new ExecuteHandler(true, "Business");
  const repo = new BusinessRepository(execute);
  const jwt = new JwtService(env().jwtKey);

  return new BusinessService(execute, repo, jwt);
}
