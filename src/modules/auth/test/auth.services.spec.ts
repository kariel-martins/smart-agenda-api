import { AuthService } from "../auth.service";
import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { AuthRepository } from "../auth.repository";
import { AppError } from "../../../core/errors/AppError";

describe("AuthService", () => {

  const executeMock = {
    service: jest.fn((fn) => fn())
  } as unknown as ExecuteHandler;

  const repoMock = {
    create: jest.fn(),
    getByEmail: jest.fn(),
    createToken: jest.fn(),
    getTokenRefresh: jest.fn(),
    updateRefreshToken: jest.fn(),
    update: jest.fn()
  } as unknown as AuthRepository;

  const service = new AuthService(executeMock, repoMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------
  // REGISTER
  // -------------------------

  it("deve criar usuário e mascarar email", async () => {

    repoMock.create = jest.fn().mockResolvedValue({
      id: "1",
      name: "João",
      email: "teste@email.com",
      password_hash: "hash"
    });

    const result = await service.registerUser({
      name: "João",
      email: "teste@email.com",
      password: "123456",
      comfirmPassword: "123456"
    } as any);

    expect(result.email).not.toBe("teste@email.com");
    expect(repoMock.create).toHaveBeenCalled();
  });

  it("deve lançar erro se senhas forem diferentes", async () => {

    await expect(
      service.RegisterUser({
        password: "123",
        comfirmPassword: "456"
      } as any)
    ).rejects.toBeInstanceOf(AppError);
  });

  // -------------------------
  // LOGIN
  // -------------------------

  it("deve realizar login com sucesso", async () => {

    repoMock.getByEmail = jest.fn().mockResolvedValue({
      id: "1",
      email: "teste@email.com",
      password_hash: await service["crypt"].hashText("123456"),
      name: "João"
    });

    repoMock.createToken = jest.fn();

    const result = await service.login({
      email: "teste@email.com",
      password: "123456"
    });

    expect(result.token).toBeDefined();
    expect(result.refresh_token).toBeDefined();
    expect(result.users.email).toBeDefined();
  });

  it("deve falhar login com senha inválida", async () => {

    repoMock.getByEmail = jest.fn().mockResolvedValue({
      password_hash: await service["crypt"].hashText("outraSenha")
    });

    await expect(
      service.login({
        email: "teste@email.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  // -------------------------
  // RESET PASSWORD
  // -------------------------

  it("deve atualizar senha", async () => {

    jest.spyOn(service["jwtService"], "verify").mockResolvedValue({
      sub: "1"
    } as any);

    repoMock.update = jest.fn().mockResolvedValue({});

    const result = await service.resetPassword("tokenFake", {
      password: "NovaSenha@123",
      comfirmPassword: "NovaSenha@123"
    });

    expect(result.message).toBe("Senha atualizada com sucesso!");
    expect(repoMock.update).toHaveBeenCalled();
  });

});
