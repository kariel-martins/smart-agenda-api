import { AppError } from "../../../core/errors/AppError";
import { NoShowRoleService } from "../noShowRole.service";


describe("NoShowRoleService Unit Tests", () => {
  let service: NoShowRoleService;
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
    service = new NoShowRoleService(executeMock, repoMock);
  });

  describe("create", () => {
    it("deve criar uma regra quando o businessId está presente", async () => {
      const data = { max_rate_percent: 10, action: "block_booking" };
      repoMock.create.mockResolvedValue({ id: 1, ...data, businesses_id: "biz-123" });

      const result = await service.create("biz-123", data as any);

      expect(repoMock.create).toHaveBeenCalledWith({ ...data, businesses_id: "biz-123" });
      expect(result.id).toBe(1);
    });

    it("deve lançar AppError se o businessId for nulo", async () => {
      await expect(service.create("", { max_rate_percent: 5 } as any))
        .rejects.toThrow(AppError);
    });
  });

  describe("getById (List by Business)", () => {
    it("deve retornar as regras do negócio", async () => {
      repoMock.getById.mockResolvedValue([{ id: 1, max_rate_percent: 20 }]);
      
      const result = await service.getById("biz-123");

      expect(repoMock.getById).toHaveBeenCalledWith("biz-123");
      expect(result).toHaveLength(1);
    });
  });
});