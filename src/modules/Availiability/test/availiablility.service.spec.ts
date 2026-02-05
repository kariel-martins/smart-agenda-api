import { AvailiablilityService } from "../availiablility.service";

describe("AvailiablilityService Unit Tests", () => {
  let service: AvailiablilityService;
  let repoMock: any;
  let executeMock: any;

  beforeEach(() => {
    executeMock = {
      service: jest.fn((fn) => fn()),
    };
    repoMock = {
      create: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new AvailiablilityService(executeMock, repoMock);
  });

  it("deve chamar o repositório para criar uma disponibilidade", async () => {
    const dto = { 
      day_of_week: "Monday", 
      start_time: "08:00", 
      end_time: "12:00", 
      professional_id: 1 
    };
    repoMock.create.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);

    expect(repoMock.create).toHaveBeenCalledWith(dto);
    expect(result.id).toBe(1);
  });

  it("deve buscar disponibilidade pelo ID do profissional", async () => {
    repoMock.getById.mockResolvedValue({ id: 1, professional_id: 1 });
    
    const result = await service.getById(1);

    expect(repoMock.getById).toHaveBeenCalledWith(1);
    expect(result.professional_id).toBe(1);
  });
});