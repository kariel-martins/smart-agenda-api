import { env } from "../../config/env";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { JwtService } from "../../share/services/JWTService";
import { AppointmentRepository } from "./appointment.repository";
import { AppointmentService } from "./appointment.service";

export function makeAppointmentService() {
  const execute = new ExecuteHandler(true, "Service");
  const repo = new AppointmentRepository(execute);
  const jwt = new JwtService(env().jwtKey);

  return new AppointmentService(execute, repo, jwt);
}
