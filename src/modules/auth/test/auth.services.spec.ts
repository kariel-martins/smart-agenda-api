import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { AuthRepository } from "../auth.repository";
import { AuthService } from "../auth.service";

describe("AuthService", () => {
  const executeMock = {
    service: jest.fn((fn) => fn()),
  } as unknown as ExecuteHandler;

  const repoMock = {
    create: jest.fn(),
  } as unknown as AuthRepository;

  const service = new AuthService(executeMock, repoMock);

  it("deve criar usuário e mascarar email", async () => {
    repoMock.create = jest.fn().mockResolvedValue({
      id: 1,
      name: "joão",
      email: "teste@email.com",
      password_hash: "123",
    });

    const result = await service.registerUser({
      name: "João",
      email: "teste@email.com",
      password: "123",
      comfirmPassword: "123",
    } as any);

    expect(result.email).not.toBe("teste@email.com");
    expect(repoMock.create).toHaveBeenCalled();
  });
});
