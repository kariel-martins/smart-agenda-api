import { AppError } from "../../../core/errors/AppError";
import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { BusinessRepository } from "../business.repository";
import { BusinessService } from "../business.service";

describe("BusinessService", () => {
  let executeHandler: ExecuteHandler;
  let repoMock: jest.Mocked<BusinessRepository>;
  let service: BusinessService;
  let jwtMock: jest.Mocked<IJWTService>;

  const mockBusiness = {
    id: "bus_123",
    name: "test",
    slug: null,
    phone: "99 9 8283-8342",
    email: "teste@email.com",
    active: true,
    timezone: "São paulo",
    created_at: new Date("2030-03-20"),
  };

  beforeEach(() => {
    executeHandler = new ExecuteHandler();

    repoMock = {
      getById: jest.fn(),
      update: jest.fn(),
    } as any;

    jwtMock = {
      sign: jest.fn(),
      verify: jest.fn(),
    } as any;

    service = new BusinessService(executeHandler, repoMock, jwtMock);

    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("deve retornar o business extraindo o ID do token (scope)", async () => {
      const fakeToken = "token_valido";
      
      jwtMock.verify.mockResolvedValue({
        purpose: "ACCESS_TOKEN",
        scope: "bus_123", 
        sub: "user_id_1"
      } as any);

      repoMock.getById.mockResolvedValue(mockBusiness);

      const result = await service.getById(fakeToken);

      expect(jwtMock.verify).toHaveBeenCalledWith(fakeToken);
      expect(repoMock.getById).toHaveBeenCalledWith("bus_123");
      expect(result).toEqual(mockBusiness);
    });

    it("deve lançar AppError quando o token não contém o scope", async () => {
      jwtMock.verify.mockResolvedValue({ purpose: "ACCESS_TOKEN" } as any);

      await expect(service.getById("token_sem_scope"))
        .rejects.toBeInstanceOf(AppError);
    });
  });

  describe("update", () => {
    it("deve atualizar o business usando o ID do token", async () => {
      const businessId = "bus_123";

      jwtMock.verify.mockReturnValue({
        purpose: "ACCESS_TOKEN",
        scope: businessId,
        role: "staff",
        sub: "user_1",
      } as any);


      repoMock.update.mockResolvedValue({
        ...mockBusiness,
        name: "updated",
      });

      const result = await service.update(businessId, { name: "updated" });

      expect(repoMock.update).toHaveBeenCalledWith("bus_123", { name: "updated" });
      expect(result.name).toBe("updated");
    });

    it("deve lançar AppError se o token for inválido", async () => {
      jwtMock.verify.mockRejectedValue(new AppError("Não autorizado", 401));

      await expect(service.update("token_invalido", { name: "novo" }))
        .rejects.toBeInstanceOf(AppError);
    });
  });
});