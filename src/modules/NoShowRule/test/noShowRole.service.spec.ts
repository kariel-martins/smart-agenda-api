import { AppError } from "../../../core/errors/AppError";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { NoShowRoleService } from "../noShowRole.service";


describe("NoShowRoleService Unit Tests", () => {
  let service: NoShowRoleService;
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
      service = new NoShowRoleService(executeMock, repoMock, jwtMock);
    });

  describe("create", () => {
    it("deve criar uma regra quando o accessToken está presente", async () => {
      const businessId = "bus_123";

      jwtMock.verify.mockReturnValue({
        purpose: "ACCESS_TOKEN",
        scope: businessId,
        role: "staff",
        sub: "user_1",
      } as any);

      const data = { max_rate_percent: 10, action: "block_booking" };
      repoMock.create.mockResolvedValue({ id: 1, ...data, businesses_id: businessId });

      const result = await service.create(businessId, data as any);

      expect(repoMock.create).toHaveBeenCalledWith({ ...data, businesses_id: businessId });
      expect(result.id).toBe(1);
    });

    it("deve lançar AppError se o accessToken for nulo", async () => {
      await expect(service.create("", { max_rate_percent: 5 } as any))
        .rejects.toThrow(AppError);
    });
  });

  describe("getById (List by Business)", () => {
    it("deve retornar as regras do negócio", async () => {
       const businessId = "bus_123";

      jwtMock.verify.mockReturnValue({
        purpose: "ACCESS_TOKEN",
        scope: businessId,
        role: "staff",
        sub: "user_1",
      } as any);

      repoMock.getById.mockResolvedValue([{ id: 1, max_rate_percent: 20 }]);
      
      const result = await service.getById(businessId);

      expect(repoMock.getById).toHaveBeenCalledWith(businessId);
      expect(result).toHaveLength(1);
    });
  });
});