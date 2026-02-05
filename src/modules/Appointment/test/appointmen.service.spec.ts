import { AppError } from "../../../core/errors/AppError";
import { AppointmentService } from "../appointment.service";

describe("AppointmentService", () => {
  let service: AppointmentService;
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

    service = new AppointmentService(executeMock, repoMock);
  });

  describe("create", () => {
    it("deve criar um agendamento com sucesso", async () => {
      const mockData = { professional_id: "1", service_id: "2", client_id: "c1" };
      const businessId = "bus_123";
      
      repoMock.create.mockResolvedValue({ id: 1, ...mockData, businesses_id: businessId });

      const result = await service.create(businessId, mockData as any);

      expect(repoMock.create).toHaveBeenCalledWith(expect.objectContaining({
        professional_id: 1,
        businesses_id: businessId
      }));
      expect(result.id).toBe(1);
    });

    it("deve lançar AppError se businessId estiver ausente", async () => {
      await expect(service.create("", {} as any))
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