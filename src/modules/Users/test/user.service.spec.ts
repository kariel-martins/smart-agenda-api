import { UserService } from "../user.service";
import { ExecuteHandler } from "../../../core/handlers/executeHandler";
import { UserRepository } from "../user.repository";

describe("UserService", () => {
  const executeMock = {
    service: jest.fn((fn) => fn()),
  } as unknown as ExecuteHandler;

  const repoMock = {
    create: jest.fn(),
  } as unknown as UserRepository;

  const service = new UserService(executeMock, repoMock);

  it("deve criar usuário e mascarar email", async () => {
    repoMock.create = jest.fn().mockResolvedValue({
      id: 1,
      name: "joão",
      email: "teste1234@email.com",
      password_hash: "123",
    });

    const result = await service.RegisterUser({
      name: "João",
      email: "test1234e@email.com",
      password: "123",
      comfirmPassword: "123",
    } as any);

    expect(result.email).not.toBe("teste1234@email.com");
    expect(repoMock.create).toHaveBeenCalled();
  });
});
