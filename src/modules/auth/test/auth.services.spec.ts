import { AuthService } from "../auth.service";
import { AuthRepository } from "../auth.repository";
import { ICryptoService } from "../../../share/services/interfaces/ICryptoService";
import { IJWTService } from "../../../share/services/interfaces/IJWTService";
import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { AppError } from "../../../core/errors/AppError";

describe("AuthService", () => {
  let service: AuthService;
  let repoMock: jest.Mocked<AuthRepository>;
  let cryptMock: jest.Mocked<ICryptoService>;
  let jwtServiceMock: jest.Mocked<IJWTService>;
  let maskMock: any;
  let executeMock: jest.Mocked<ExecuteHandler>;

  const makeFakeUser = () => ({
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
    executeMock = {
      service: jest.fn((fn) => fn()),
    } as any;

    repoMock = {
      create: jest.fn(),
      createToken: jest.fn(),
      getByEmail: jest.fn(),
      getUserNotExists: jest.fn(),
      updateRefreshToken: jest.fn(),
      update: jest.fn(),
      revokeAllUserTokens: jest.fn(),
      getTokenRefresh: jest.fn(),
    } as any;

    cryptMock = {
      hashText: jest.fn().mockResolvedValue("hashFake"),
      verifyText: jest.fn().mockResolvedValue(true),
    } as any;

    jwtServiceMock = {
      sign: jest.fn().mockReturnValue("jwtFake"),
      verify: jest.fn(),
    } as any;

    maskMock = {
      email: jest.fn().mockReturnValue("t****@email.com"),
    };

    service = new AuthService(
      executeMock,
      repoMock,
      cryptMock,
      jwtServiceMock,
      maskMock
    );

    jest.clearAllMocks();
  });

  describe("REGISTER", () => {
    it("deve criar usuário e mascarar email com sucesso", async () => {
      repoMock.create.mockResolvedValue({
        ...makeFakeUser(),
        tokenRefresh: {},
      } as any);

      const payload = {
        name: "João",
        email: "teste@email.com",
        password: "123",
        confirmPassword: "123",
        nameBusiness: "TestShop",
        phone: "9999",
      };

      const result = await service.registerUser(payload as any);

      expect(result.usersData.email).toBe("t****@email.com");
      expect(jwtServiceMock.sign).toHaveBeenCalled();
      expect(repoMock.create).toHaveBeenCalled();
    });

    it("deve lançar erro se as senhas forem diferentes", async () => {
      await expect(
        service.registerUser({
          password: "123",
          confirmPassword: "456",
        } as any)
      ).rejects.toBeInstanceOf(AppError);
    });
  });

  describe("LOGIN", () => {
    it("deve realizar login e retornar tokens", async () => {
      repoMock.getByEmail.mockResolvedValue(makeFakeUser() as any);

      const result = await service.login({
        email: "teste@email.com",
        password: "123",
      });

      expect(result.token).toBe("jwtFake");
      expect(cryptMock.verifyText).toHaveBeenCalledWith("123", "hashFake");
    });

    it("deve falhar login se a senha estiver incorreta", async () => {
      repoMock.getByEmail.mockResolvedValue(makeFakeUser() as any);
      cryptMock.verifyText.mockResolvedValue(false);

      await expect(
        service.login({ email: "teste@email.com", password: "errada" })
      ).rejects.toThrow(AppError);
    });
  });

  describe("FORGOT PASSWORD", () => {
    it("deve gerar token de recuperação", async () => {
      repoMock.getByEmail.mockResolvedValue(makeFakeUser() as any);

      const result = await service.forgotPassword("teste@email.com");
      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        expect.objectContaining({ purpose: "FORGOT_PASSWORD" }),
        "15m"
      );
      expect(result.message).toContain("sucesso");
    });
  });
});