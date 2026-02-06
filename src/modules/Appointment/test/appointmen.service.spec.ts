import { AppError } from "../../../core/errors/AppError";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { AppointmentService } from "../appointment.service";

describe("AppointmentService", () => {
  let service: AppointmentService;
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
    };

    jwtMock = {
      sign: jest.fn(),
      verify: jest.fn()
    } as any;

    service = new AppointmentService(executeMock, repoMock, jwtMock);

    jest.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar um agendamento extraindo o businessId da propriedade 'scope' do token", async () => {

      const accessToken = "token_com_scope_business";
      const businessId = "bus_123";
      const mockData = { professional_id: 1, service_id: 2, client_id: "c1" };

      jwtMock.verify.mockReturnValue({ 
        purpose: "ACCESS_TOKEN",
        scope: businessId, 
        sub: "user_1" 
      } as any); 
      
      repoMock.create.mockResolvedValue({ id: 1, ...mockData, businesses_id: businessId });

      const result = await service.create(accessToken, mockData as any);

      expect(jwtMock.verify).toHaveBeenCalledWith(accessToken);
      
      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
        businesses_id: businessId,
        professional_id: 1
      }));
      
      expect(result.id).toBe(1);
    });

    it("deve lançar AppError se o token estiver corrompido ou sem scope", async () => {
      jwtMock.verify.mockReturnValue({ purpose: "ACCESS_TOKEN" } as any);

      await expect(service.create("token_zoado", {} as any))
        .rejects.toThrow(AppError);
    });

    it("deve lançar AppError se o JWT.verify disparar um erro (token expirado/inválido)", async () => {
      jwtMock.verify.mockImplementation(() => {
        throw new AppError("Não autorizado", 401);
      });

      await expect(service.create("token_expirado", {} as any))
        .rejects.toThrow(AppError);
    });
  });

  describe("getByDate", () => {
    it("deve retornar uma lista de agendamentos para uma data", async () => {
      const date = "2023-10-25";
      repoMock.getByDate.mockResolvedValue([{ id: 1, date }]);

      const result = await service.getByDate(date);

      expect(repoMock.getByDate).toHaveBeenCalledWith(date);
      expect(result).toHaveLength(1);
    });
  });
});