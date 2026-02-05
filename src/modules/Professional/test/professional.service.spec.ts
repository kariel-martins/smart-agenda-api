import { AppError } from "../../../core/errors/AppError";
import { ProfessionalService } from "../professional.service";

describe("ProfessionalService Unit Tests", () => {
  let service: ProfessionalService;
  let repoMock: any;
  let executeMock: any;

  beforeEach(() => {
    executeMock = { service: jest.fn((fn) => fn()) };
    repoMock = {
      create: jest.fn(),
      getByIdBusiness: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new ProfessionalService(executeMock, repoMock);
  });

  describe("create", () => {
    it("deve criar um profissional se a role for autorizada (ADMIN)", async () => {
      const data = { name: "Dr. Smith", specialty: "Dentist", role: "ADMIN" };
      repoMock.create.mockResolvedValue({ id: 1, ...data });

      const result = await service.create("biz-123", data);

      expect(repoMock.create).toHaveBeenCalled();
      expect(result.id).toBe(1);
    });

    it("deve lançar erro se a role não for autorizada", async () => {
      const data = { name: "Staff", specialty: "None", role: "STAFF" };
      
      await expect(service.create("biz-123", data as any))
        .rejects.toThrow(new AppError("Usuário não autorizado para ação!"));
    });

    it("deve lançar erro se businessId estiver ausente", async () => {
      await expect(service.create("", { role: "ADMIN" } as any))
        .rejects.toThrow(new AppError("businessId ausente ou inválido"));
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