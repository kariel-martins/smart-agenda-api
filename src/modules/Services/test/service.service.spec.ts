import { AppError } from "../../../core/errors/AppError";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { ServiceService } from "../service.service";

describe("ServiceService Unit Tests", () => {
  let service: ServiceService;
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
      service = new ServiceService(executeMock, repoMock, jwtMock);
    });
  

  describe("create", () => {
    it("deve criar um serviço quando businessId é fornecido", async () => {
       const businessId = "bus_123";

      jwtMock.verify.mockReturnValue({
        purpose: "ACCESS_TOKEN",
        scope: businessId,
        role: "staff",
        sub: "user_1",
      } as any);

      const serviceData = { name: "Corte Masculino", duration_minutes: "30", price: "50" };
      repoMock.create.mockResolvedValue({ id: 1, ...serviceData });

      const result = await service.create(businessId, serviceData as any);

      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
        businesses_id: businessId,
        name: "Corte Masculino"
      }));
      expect(result.id).toBe(1);
    });

    it("deve lançar AppError se businessId estiver ausente", async () => {
      await expect(service.create("", {} as any))
        .rejects.toThrow(new AppError("Token ausente ou inválido!"));
    });
  });

  describe("delete", () => {
    it("deve retornar mensagem de sucesso", async () => {
      repoMock.delete.mockResolvedValue({});
      const result = await service.delete(1);
      expect(result.message).toBe("Serviço deletado!");
    });
  });
});