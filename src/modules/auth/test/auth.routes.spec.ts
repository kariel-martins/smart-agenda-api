import request from "supertest";
import { app } from "../../../app";

describe("AUTH ROUTES", () => {

  it("POST /auth/register", async () => {

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "João",
        email: "joao@email.com",
        password: "DevAdmin@26",
        comfirmPassword: "DevAdmin@26"
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBeDefined();
  });

  it("POST /auth/login", async () => {

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "joao@email.com",
        password: "DevAdmin@26"
      });

    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
  });

});
