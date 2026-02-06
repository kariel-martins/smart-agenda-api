import { AppError } from "../../../core/errors/AppError";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { ClientService } from "../client.service";

describe("ClientService Unit Tests", () => {
  let service: ClientService;
  let jwtMock: jest.Mocked<IJWTService>;
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
    jwtMock = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    service = new ClientService(executeMock, repoMock, jwtMock);
  });

  describe("create", () => {
    it("deve criar um cliente quando businessId é fornecido", async () => {
      const businessId = "bus_123";

      jwtMock.verify.mockReturnValue({
        purpose: "ACCESS_TOKEN",
        scope: businessId,
        role: "staff",
        sub: "user_1",
      } as any);

      const clientData = {
        name: "João Silva",
        email: "joao@email.com",
        phone: "11999999999",
      };

      repoMock.create.mockResolvedValue({
        id: "uuid-cliente",
        ...clientData,
        businesses_id: businessId,
      });

      const result = await service.create(businessId, clientData as any);

      expect(repoMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          businesses_id: "bus_123",
          email: "joao@email.com",
          name: "João Silva",
          phone: "11999999999",
        }),
      );
      expect(result.id).toBe("uuid-cliente");
    });

    it("deve lançar AppError se businessId estiver ausente", async () => {
      await expect(service.create("", {} as any)).rejects.toThrow(
        new AppError("Token ausente ou inválido!"),
      );
    });
  });

  describe("getById (List by Business)", () => {
    it("deve retornar a lista de clientes do negócio", async () => {
      const businessId = "bus_123";

      jwtMock.verify.mockReturnValue({
        purpose: "ACCESS_TOKEN",
        scope: businessId,
        role: "staff",
        sub: "user_1",
      } as any);

      repoMock.getById.mockResolvedValue([{ id: "1", name: "Cliente A" }]);

      const result = await service.getById(businessId);

      expect(repoMock.getById).toHaveBeenCalledWith(businessId);
      expect(result).toHaveLength(1);
    });
  });
});
