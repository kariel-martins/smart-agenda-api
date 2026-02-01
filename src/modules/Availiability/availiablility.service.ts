import { ExecuteHandler } from "../../core/handlers/executeHandler";
import { AvailiablilityRepository } from "./availiablility.repository";
import { availiablilityData } from "./dtos/avaliability.dto.schema";
import { Availiablility, UpdateAvailiablility } from "./dtos/avaliability.dto.type";

export class AvailiablilityService {
  constructor(
    private readonly execute: ExecuteHandler,
    private readonly repo: AvailiablilityRepository,
  ) {}

  public create(data: availiablilityData): Promise<Availiablility> {
    return this.execute.service(
      async () => {
        const result = await this.repo.create(data);

        return result;
      },
      "Erro ao executar create",
      "Availability/availability.service.ts/create",
    );
  }

  public getById(professional_id: number): Promise<any> {
    return this.execute.service(
      async () => {
        const result = await this.repo.getById(professional_id);

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

  public delete(Availabilities_id: number): Promise<void> {
    return this.execute.service(
      async () => {
        await this.repo.delete(Availabilities_id);

      },
      "Erro ao executar delete",
      "Availability/availability.service.ts/delete",
    );
  }
}
