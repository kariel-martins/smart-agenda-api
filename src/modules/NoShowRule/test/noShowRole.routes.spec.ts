import request from "supertest";
import { businesses, no_show_rules } from "../../../database/Schemas";
import { db } from "../../../database/Client";
import { app } from "../../../app";
import { getCookies, saveCookies } from "../../../config/test";

describe("NoShowRole E2E Routes", () => {
  let testBusinessId: string;
  let createdRuleId: number;

  it("deve criar uma conta", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      name: "João",
      nameBusiness: "lojaTest",
      phone: "+55 (99) 000009999",
      email: "joao@email.com",
      password: "DevAdmin@26",
      confirmPassword: "DevAdmin@26",
    });

    saveCookies(response);
    
    expect(response.status).toBe(201);
    
    expect(response.body).toHaveProperty("usersData");
    expect(response.body).toHaveProperty("businessData");
    
    expect(response.headers["set-cookie"]).toBeDefined();
    testBusinessId = response.body.usersData.business_id
  });

  describe("POST /rules", () => {
    it("deve criar uma regra de no-show com sucesso", async () => {
      const payload = {
        max_rate_percent: 15,
        action: "require_deposit",
      };

      const response = await request(app)
        .post("/api/v1/no-show/rules")
        .set("Cookie", getCookies())
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body.max_rate_percent).toBe(15);
      expect(response.body.businesses_id).toBe(testBusinessId);

      createdRuleId = response.body.id;
    });

    it("deve falhar se os dados não seguirem o schema (max_rate não numérico)", async () => {
      const response = await request(app)
        .post("/api/v1/no-show/rules")
        .set("Cookie", getCookies())
        .send({ max_rate_percent: "muito alto", action: "block_booking" });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /rules", () => {
    it("deve buscar as regras vinculadas ao businessId do cookie", async () => {
      const response = await request(app)
        .get("/api/v1/no-show/rules")
        .set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].id).toBe(createdRuleId);
    });
  });

  describe("PUT /rules/:noShowRule_id", () => {
    it("deve atualizar a regra existente", async () => {
      const response = await request(app)
        .put(`/api/v1/no-show/rules/${createdRuleId}`)
        .send({
          max_rate_percent: 30,
          action: "manual_approval",
        });

      expect(response.status).toBe(200);
      expect(response.body.max_rate_percent).toBe(30);
      expect(response.body.action).toBe("manual_approval");
    });
  });

  describe("DELETE /rules/:noShowRule_id", () => {
    it("deve deletar a regra e retornar 204", async () => {
      const response = await request(app).delete(
        `/api/v1/no-show/rules/${createdRuleId}`,
      );

      expect(response.status).toBe(204);
      const check = await db.select().from(no_show_rules);
      expect(check.length).toBe(0);
    });
  });
});
