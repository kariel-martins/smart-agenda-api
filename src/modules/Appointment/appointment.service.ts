import { AppError } from "../../core/errors/AppError";
import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { AppointmentRepository } from "./appointment.repository";
import {
  Appointment,
  InsertAppointment,
  UpdateAppointment,
} from "./dtos/appointment.dto.type";

export class AppointmentService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: AppointmentRepository,
  ) {}

  public create(businessId: string, data: InsertAppointment): Promise<Appointment> {
    return this.execute.service(
      async () => {
        if (!businessId) throw new AppError("businessId inválido ou ausente!");
        
        const result = await this.repo.create({
          ...data,
          professional_id: Number(data.professional_id),
          service_id: Number(data.service_id),
          businesses_id: businessId,
        });

        return result;
      },
      "Erro ao executar create",
      "Appointment/appointment.service.ts/create",
    );
  }

  public getByDate(date: string): Promise<Appointment[]> {
    return this.execute.service(
      async () => {
        if (!date) {
        throw new Error("Date não informado");
      }

        const result = await this.repo.getByDate(date);

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

  public update(
    appointments_id: number,
    data: UpdateAppointment,
  ): Promise<Appointment> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(appointments_id, data);

        return result;
      },
      "Erro ao executar update",
      "Appointment/appointment.service.ts/update",
    );
  }
}
