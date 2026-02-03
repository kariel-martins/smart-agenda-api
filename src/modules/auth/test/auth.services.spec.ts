import { AuthService } from "../auth.service";
import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { AuthRepository } from "../auth.repository";
import { AppError } from "../../../core/errors/AppError";
import { ICryptoService } from "../../../share/services/interfaces/ICryptoService";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";

describe("AuthService", () => {
  const cryptMock = {
    hashText: jest.fn(),
    verifyText: jest.fn(),
  } as unknown as ICryptoService;

  const jwtServiceMock = {
    sign: jest.fn(),
    verify: jest.fn(),
  } as unknown as IJWTService;

  const maskMock = {
    email: jest.fn(),
  };

  const executeMock = {
    service: jest.fn((fn) => fn()),
  } as unknown as ExecuteHandler;

  const repoMock = {
    create: jest.fn(),
    createToken: jest.fn(),
    getByEmail: jest.fn(),
    getUserNotExists: jest.fn(),
    getTokenRefresh: jest.fn(),
    updateRefreshToken: jest.fn(),
    revokeAllUserTokens: jest.fn(),
    update: jest.fn(),
  } as unknown as AuthRepository;

  const service = new AuthService(
    executeMock,
    repoMock,
    cryptMock,
    jwtServiceMock,
    maskMock,
  );

  const mockUserAndBusiness = () => ({
    users: {
      id: "1",
      email: "teste@email.com",
      password_hash: "hashFake",
      name: "João",
    },
    businesses: {
      id: "b1",
      name: "Shop",
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();

    cryptMock.hashText = jest.fn().mockResolvedValue("hashFake");
    cryptMock.verifyText = jest.fn().mockResolvedValue(true);

    jwtServiceMock.sign = jest.fn().mockReturnValue("jwtFake");
    jwtServiceMock.verify = jest.fn();

    repoMock.getUserNotExists = jest.fn().mockResolvedValue(null);
    repoMock.getByEmail = jest.fn().mockResolvedValue(mockUserAndBusiness());
  });

  describe("REGISTER", () => {
    it("deve criar usuário e mascarar email", async () => {
      repoMock.create = jest.fn().mockResolvedValue({
        users: {
          id: "1",
          name: "João",
          email: "teste@email.com",
        },
        businesses: {
          id: "b1",
          name: "TestShop",
        },
        tokenRefresh: {},
      });

      maskMock.email = jest.fn().mockReturnValue("t****@email.com");

      const result = await service.registerUser({
        name: "João",
        email: "teste@email.com",
        password: "123",
        confirmPassword: "123",
        nameBusiness: "TestShop",
        phone: "9999",
      } as any);

      expect(result.usersData.email).toBe("t****@email.com");
      expect(result.token).toBeDefined();
      expect(result.refresh_token).toBeDefined();
    });

    it("deve lançar erro se senhas forem diferentes", async () => {
      repoMock.getUserNotExists = jest.fn().mockResolvedValue(null);

      await expect(
        service.registerUser({
          password: "123",
          confirmPassword: "456",
        } as any),
      ).rejects.toBeInstanceOf(AppError);
    });
  });

  describe("LOGIN", () => {
    it("deve realizar login com sucesso", async () => {
      cryptMock.verifyText = jest.fn().mockResolvedValue(true);

      repoMock.getByEmail = jest.fn().mockResolvedValue({
        users: {
          id: "1",
          email: "teste@email.com",
          password_hash: "hashFake",
          name: "João",
        },
        businesses: {
          id: "b1",
          name: "Shop",
        },
      });

      const result = await service.login({
        email: "teste@email.com",
        password: "123",
      });

      expect(result.token).toBe("jwtFake");
      expect(result.refresh_token).toBe("jwtFake");
    });
    it("deve falhar login com senha inválida", async () => {
      cryptMock.verifyText = jest.fn().mockResolvedValue(false);

      repoMock.getByEmail = jest.fn().mockResolvedValue({
        users: {
          password_hash: "hashFake",
        },
      });

      await expect(
        service.login({
          email: "teste@email.com",
          password: "123",
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });

  describe("RESERT-PASSWORD", () => {
    it("deve atualizar senha", async () => {
      jwtServiceMock.verify = jest.fn().mockResolvedValue({
        sub: "1",
        purpose: "FORGOT_PASSWORD",
      });

      repoMock.update = jest.fn();

      const result = await service.resetPassword("token", {
        password: "Nova123",
        confirmPassword: "Nova123",
      });

      expect(repoMock.update).toHaveBeenCalled();
      expect(result.message).toBe("Senha atualizada com sucesso!");
    });
  });

  describe("FORGOT PASSWORD", () => {
    it("deve gerar token de recuperação de senha", async () => {
      repoMock.getByEmail = jest.fn().mockResolvedValue({
        users: {
          id: "1",
          email: "teste@email.com",
        },
      });

      jwtServiceMock.sign = jest.fn().mockReturnValue("forgotTokenFake");

      const result = await service.forgotPassword("teste@email.com");

      expect(repoMock.getByEmail).toHaveBeenCalledWith("teste@email.com");

      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        {
          purpose: "FORGOT_PASSWORD",
          sub: "1",
        },
        "15m",
      );

      expect(result).toEqual({
        message: "Email enviar com sucesso!",
        token: "forgotTokenFake",
      });
    });
  });
});
