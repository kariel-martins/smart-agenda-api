import { AppError } from "../../../core/errors/AppError";
import { ClientService } from "../client.service";

describe("ClientService Unit Tests", () => {
  let service: ClientService;
  let repoMock: any;
  let executeMock: any;

  beforeEach(() => {
    executeMock = { service: jest.fn((fn) => fn()) };
    repoMock = {
      create: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new ClientService(executeMock, repoMock);
  });

  describe("create", () => {
    it("deve criar um cliente quando businessId é fornecido", async () => {
      const clientData = { name: "João Silva", email: "joao@email.com", phone: "11999999999" };
      const bizId = "uuid-da-empresa";
      
      repoMock.create.mockResolvedValue({ id: "uuid-cliente", ...clientData, businesses_id: bizId });

      const result = await service.create(bizId, clientData as any);

      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
        businesses_id: bizId,
        name: "João Silva"
      }));
      expect(result.id).toBe("uuid-cliente");
    });

    it("deve lançar AppError se businessId estiver ausente", async () => {
      await expect(service.create("", {} as any))
        .rejects.toThrow(new AppError("businessId inválido ou ausente!"));
    });
  });

  describe("getById (List by Business)", () => {
    it("deve retornar a lista de clientes do negócio", async () => {
      repoMock.getById.mockResolvedValue([{ id: "1", name: "Cliente A" }]);
      
      const result = await service.getById("biz-123");

      expect(repoMock.getById).toHaveBeenCalledWith("biz-123");
      expect(result).toHaveLength(1);
    });
  });
});