import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { AppointmentRepository } from "./appointment.repository";
import { Appointment, InsertAppointment, UpdateAppointment } from "./dtos/appointment.dto.type";

export class AppointmentService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: AppointmentRepository,
  ) {}

  public create(data: InsertAppointment): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data);

        return result;
      },
      "Erro ao executar create",
      "Appointment/appointment.service.ts/create",
    );
  }

  public getById(professional_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(professional_id);

        return result;
      },
      "Erro ao executar getById",
      "Appointment/appointment.service.ts/getById",
    );
  }

  public getAll(): Promise<Appointment[]> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getAll();

        return result;
      },
      "Erro ao executar getAll",
      "Appointment/appointment.service.ts/getAll",
    );
  }

  public update(professional_id: number, data: UpdateAppointment): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(professional_id, data);

        return result;
      },
      "Erro ao executar update",
      "Appointment/appointment.service.ts/update",
    );
  }

  public delete(professional_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(professional_id);

        return result;
      },
      "Erro ao executar delete",
      "Appointment/appointment.service.ts/delete",
    );
  }
}
