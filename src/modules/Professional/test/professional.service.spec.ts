import { AppError } from "../../../core/errors/AppError";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { ProfessionalService } from "../professional.service";

describe("ProfessionalService Unit Tests", () => {
  let service: ProfessionalService;
  let jwtMock: jest.Mocked<IJWTService>;
  let repoMock: any;
  let executeMock: any;

  beforeEach(() => {
    executeMock = {
      service: jest.fn((fn) => fn()),
    };

    repoMock = {
      create: jest.fn(),
      getByDate: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    jwtMock = {
      sign: jest.fn(),
      verify: jest.fn(),
    } as any;

    service = new ProfessionalService(executeMock, repoMock, jwtMock);

    jest.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar um profissional se a role for autorizada (ADMIN)", async () => {
      const businessId = "bus_123";

      jwtMock.verify.mockReturnValue({ 
        purpose: "ACCESS_TOKEN",
        scope: businessId, 
        role: "admin",
        sub: "user_1" 
      } as any); 
      const data = { name: "Dr. Smith", specialty: "Dentist", role: "ADMIN" };
      repoMock.create.mockResolvedValue({ id: 1, ...data });

      const result = await service.create("biz-123", data);

      expect(repoMock.create).toHaveBeenCalled();
      expect(result.id).toBe(1);
    });

    it("deve lançar erro se businessId estiver ausente", async () => {
      await expect(
        service.create("", { role: "ADMIN" } as any),
      ).rejects.toThrow(new AppError("Token ausente ou inválido!"));
    });
  });

  describe("delete", () => {
    it("deve retornar mensagem de sucesso ao deletar", async () => {
      repoMock.delete.mockResolvedValue({});
      const result = await service.delete(1);
      expect(result.message).toContain("deletado com sucesso");
    });
  });
});
