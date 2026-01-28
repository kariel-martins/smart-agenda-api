import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { AvailiablilityRepository } from "./availiablility.repository";
import { Availiablility, InsertAvailiablility, UpdateAvailiablility } from "./dtos/avaliability.dto.type";

export class AvailiablilityService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: AvailiablilityRepository,
  ) {}

  public create(data: InsertAvailiablility): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data);

        return result;
      },
      "Erro ao executar create",
      "Availability/availability.service.ts/create",
    );
  }

  public getById(Availabilities_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(Availabilities_id);

        return result;
      },
      "Erro ao executar getById",
      "Availability/availability.service.ts/getById",
    );
  }

  public getAll(): Promise<Availiablility[]> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getAll();

        return result;
      },
      "Erro ao executar getAll",
      "Availability/availability.service.ts/getAll",
    );
  }

  public update(Availabilities_id: number, data: UpdateAvailiablility): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.update(Availabilities_id, data);

        return result;
      },
      "Erro ao executar update",
      "Availability/availability.service.ts/update",
    );
  }

  public delete(Availabilities_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.delete(Availabilities_id);

        return result;
      },
      "Erro ao executar delete",
      "Availability/availability.service.ts/delete",
    );
  }
}
