import { AppError } from "../../../core/errors/AppError";
import { ICryptoService } from "../../../share/services/interfaces/ICryptoService";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { UsersService } from "../users.service";

describe("AuthService (Users Module)", () => {
  let service: UsersService;

  const executeMock = {
    service: jest.fn(),
  };

  const repoMock = {
    create: jest.fn(),
    getUserNotExists: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const jwtMock: jest.Mocked<IJWTService> = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const cryptoMock: jest.Mocked<ICryptoService> = {
    hashText: jest.fn(),
    verifyText: jest.fn(),
  };

  beforeEach(() => {
    executeMock.service.mockImplementation((fn: any) => fn());

    service = new UsersService(
      executeMock as any,
      repoMock as any,
      cryptoMock,
      jwtMock,
    );

    jest.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar um funcionário com sucesso", async () => {
      jwtMock.verify.mockResolvedValue({
        sub: "admin-1",
        scope: "biz-123",
        purpose: "REFRESH_TOKEN",
      } as any);

      repoMock.getUserNotExists.mockResolvedValue(undefined);
      cryptoMock.hashText.mockResolvedValue("hashed-password");

      repoMock.create.mockResolvedValue({
        id: "user-1",
        name: "João",
        email: "joao@email.com",
      });

      const result = await service.create("token-valido", {
        name: "João",
        email: "joao@email.com",
        phone: "99999999",
        role: "EMPLOYEE",
        password: "123456",
        confirmPassword: "123456",
      });

      expect(jwtMock.verify).toHaveBeenCalledWith("token-valido");
      expect(repoMock.getUserNotExists).toHaveBeenCalledWith("joao@email.com");
      expect(cryptoMock.hashText).toHaveBeenCalledWith("123456");

      expect(repoMock.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "joao@email.com",
          business_id: "biz-123",
          password_hash: "hashed-password",
        }),
      );

      expect(result).toHaveProperty("id");
    });

    it("deve lançar erro se token for inválido", async () => {
      jwtMock.verify.mockResolvedValue(null as any);

      await expect(
        service.create("token-invalido", {} as any),
      ).rejects.toThrow(AppError);

      expect(repoMock.create).not.toHaveBeenCalled();
    });

    it("deve lançar erro se as senhas não coincidirem", async () => {
      jwtMock.verify.mockResolvedValue({
        sub: "admin-1",
        scope: "biz-123",
        purpose: "REFRESH_TOKEN",
      } as any);

      await expect(
        service.create("token", {
          name: "Maria",
          email: "maria@email.com",
          phone: "999999",
          role: "EMPLOYEE",
          password: "123456",
          confirmPassword: "654321",
        }),
      ).rejects.toThrow("Senhas não coincidem!");
    });
  });

  describe("getById", () => {
    it("deve retornar um funcionário pelo id", async () => {
      repoMock.getById.mockResolvedValue({
        id: "user-1",
        name: "João",
      });

      const result = await service.getById("user-1");

      expect(repoMock.getById).toHaveBeenCalledWith("user-1");
      expect(result).toHaveProperty("id", "user-1");
    });
  });

  describe("getAll", () => {
    it("deve listar funcionários da empresa", async () => {
      jwtMock.verify.mockResolvedValue({
        sub: "admin-1",
        scope: "biz-123",
        purpose: "ACCESS_TOKEN",
      } as any);

      repoMock.getAll.mockResolvedValue([
        { id: "1", name: "João" },
        { id: "2", name: "Maria" },
      ]);

      const result = await service.getAll("token-valido");

      expect(jwtMock.verify).toHaveBeenCalled();
      expect(repoMock.getAll).toHaveBeenCalledWith("biz-123");
      expect(result).toHaveLength(2);
    });

    it("deve lançar erro se token não for ACCESS_TOKEN", async () => {
      jwtMock.verify.mockResolvedValue({
        purpose: "REFRESH_TOKEN",
      } as any);

      await expect(
        service.getAll("token"),
      ).rejects.toThrow("Token ausente ou inválido!");
    });
  });

  describe("update", () => {
    it("deve atualizar um funcionário", async () => {
      repoMock.update.mockResolvedValue({
        id: "user-1",
        name: "Nome Atualizado",
      });

      const result = await service.update("user-1", {
        name: "Nome Atualizado",
      });

      expect(repoMock.update).toHaveBeenCalledWith("user-1", {
        name: "Nome Atualizado",
      });

      expect(result.name).toBe("Nome Atualizado");
    });
  });

  describe("delete", () => {
    it("deve remover um funcionário com sucesso", async () => {
      repoMock.delete.mockResolvedValue(undefined);

      const result = await service.delete("user-1");

      expect(repoMock.delete).toHaveBeenCalledWith("user-1");
      expect(result.message).toContain("removido com sucesso");
    });

    it("deve propagar erro se o repo falhar", async () => {
      repoMock.delete.mockRejectedValue(new Error("DB error"));

      await expect(service.delete("user-1")).rejects.toThrow();
    });
  });
});
