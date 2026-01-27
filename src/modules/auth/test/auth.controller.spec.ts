import { createUser } from "../auth.controller";
import { makeAuthService } from "../auth.factory";

jest.mock("../auth.factory");

describe("AuthController", () => {

  const serviceMock = {
    RegisterUser: jest.fn()
  };

  (makeAuthService as jest.Mock).mockReturnValue(serviceMock);

  it("deve retornar status 201", async () => {

    serviceMock.RegisterUser.mockResolvedValue({
      id: "1",
      email: "masked@email.com"
    });

    const req: any = {
      body: {}
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next: any = {}

    await createUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

});
