import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { NotificationsRepository } from "./notifications.repository";
import { AppError } from "../../core/errors/AppError";

export class NotificationsService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: NotificationsRepository
  ) {}

  public enqueue(data: {
    appointment_id: number;
    type: string;
  }) {
    return this.execute.service(
      async () => {
        const alreadySent =
          await this.repo.findByAppointmentAndType(
            data.appointment_id,
            data.type
          );

        if (alreadySent) {
          throw new AppError(
            "Notificação já enviada",
            409
          );
        }

        // Aqui futuramente entra RabbitMQ
        return {
          queued: true,
          ...data,
        };
      },
      "Erro ao enfileirar notificação",
      "Notifications/notifications.service.ts/enqueue"
    );
  }

  public log(data: {
    appointment_id: number;
    type: string;
    status: string;
  }) {
    return this.execute.service(
      async () => {
        return this.repo.create(data);
      },
      "Erro ao salvar log",
      "Notifications/notifications.service.ts/log"
    );
  }

  public getLogs(status?: string) {
    return this.execute.service(
      async () => this.repo.getLogs(status),
      "Erro ao buscar logs",
      "Notifications/notifications.service.ts/getLogs"
    );
  }
}
