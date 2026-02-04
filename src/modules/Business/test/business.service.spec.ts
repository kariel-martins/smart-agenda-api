import { AppError } from "../../../core/errors/AppError";
import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { BusinessRepository } from "../business.repository";
import { BusinessService } from "../business.service";

describe("BusinessService", () => {
  let executeHandler: ExecuteHandler;
  let repoMock: jest.Mocked<BusinessRepository>;
  let service: BusinessService;

  const mockBusiness = {
  id: "1",
  name: "test",
  slug: null, // permitido pelo tipo
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
    } as unknown as jest.Mocked<BusinessRepository>;

    service = new BusinessService(executeHandler, repoMock);

    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("deve retornar o business quando encontrado", async () => {
      repoMock.getById.mockResolvedValue(mockBusiness);

      const result = await service.getById("1");

      expect(repoMock.getById).toHaveBeenCalledTimes(1);
      expect(repoMock.getById).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockBusiness);
    });

    it("deve lançar AppError quando id é vazio", async () => {
      await expect(service.getById("")).rejects.toBeInstanceOf(AppError);
    });

    it("deve lançar AppError 500 quando repositório falhar", async () => {
      repoMock.getById.mockRejectedValue(new Error("DB error"));

      const result = service.getById("1");

      await expect(result).rejects.toBeInstanceOf(AppError);
    });
  });

  describe("update", () => {
    it("deve atualizar o business corretamente", async () => {
      repoMock.update.mockResolvedValue({
        ...mockBusiness,
        name: "updated",
      });

      const result = await service.update("1", { name: "updated" });

      expect(repoMock.update).toHaveBeenCalledTimes(1);
      expect(repoMock.update).toHaveBeenCalledWith("1", { name: "updated" });
      expect(result.name).toBe("updated");
    });

    it("deve lançar AppError ao tentar atualizar com id vazio", async () => {
      await expect(
        service.update("", { name: "updated" })
      ).rejects.toBeInstanceOf(AppError);
    });

    it("deve lançar AppError 500 quando update falhar no repositório", async () => {
      repoMock.update.mockRejectedValue(new Error("Update error"));

      const result = service.update("1", { name: "updated" });

      await expect(result).rejects.toBeInstanceOf(AppError);
    });
  });
});
