import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { JwtService } from "../../share/services/JWTService";
import { ProfessionalRepository } from "./professional.repository";
import { ProfessionalService } from "./professional.service";

export function makeProfessionalService() {
  const execute = new ExecuteHandler(true, "Professional");
  const repo = new ProfessionalRepository(execute);
  const jwt = new JwtService(env().jwtKey);

  return new ProfessionalService(execute, repo, jwt);
}
