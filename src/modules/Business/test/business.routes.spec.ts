import request from "supertest";
import { app } from "../../../app";
import { getCookies, saveCookies } from "../../../config/test";
import { JwtService } from "../../../share/services/JWTService";
import { env } from "../../../config/env";

describe("BUSINESS ROUTES", () => {
  const jwt = new JwtService(env().jwtKey);
  let userId: string;
  let businessId: string;

  it("deve criar uma conta", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      name: "Maria",
      nameBusiness: "lojaTest@15",
      phone: "+55 (99) 000009999",
      email: "mariaTest@email.com",
      password: "DevAdmin@26",
      confirmPassword: "DevAdmin@26",
    });

    saveCookies(response);
    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("usersData");
    expect(response.body).toHaveProperty("businessData");

    expect(response.headers["set-cookie"]).toBeDefined();
    userId = response.body.usersData.id;
    businessId = response.body.usersData.business_id;
  });

  describe("GET bussiness/profile", () => {
    it("Deve retonar os dados da empresa", async () => {
      const responce = await request(app)
        .get("/api/v1/business/profile")
        .set("Cookie", getCookies());

      expect(responce.status).toBe(200);
    });

  });
  describe("PUT bussiness/profile", () => {
    it("Deve atualizar a empresa!", async () => {
      const responce = await request(app)
        .put("/api/v1/business/profile")
        .set("Cookie", getCookies())
        .send({
          email: "admin19@gmail.com",
          phone: "99999-99999",
          name: "Barbearia do Desenvolvedor",
        });

      expect(responce.status).toBe(200);
    });
  });
});
