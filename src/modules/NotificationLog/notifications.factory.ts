import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { NotificationsRepository } from "./notifications.repository";
import { NotificationsService } from "./notifications.service";

export function makeNotificationsService() {
  const execute = new ExecuteHandler(true, "Service");
  const repo = new NotificationsRepository(execute);

  return new NotificationsService(execute, repo);
}
