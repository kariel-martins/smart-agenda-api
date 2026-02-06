// service.e2e.spec.ts
import request from "supertest";
import { db } from "../../../database/Client";
import { businesses, services } from "../../../database/Schemas";
import { app } from "../../../app";
import { getCookies, saveCookies } from "../../../config/test";

describe("Service E2E Routes", () => {
  let testBusinessId: string;
  let createdServiceId: number;

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
      testBusinessId = response.body.usersData.business_id;
    });

  describe("POST /services", () => {
    it("deve criar um serviço e retornar 201", async () => {
      const response = await request(app)
        .post("/api/v1/services")
        .set("Cookie", getCookies())
        .send({
          name: "Barba e Cabelo",
          duration_minutes: "60",
          price: "80.00"
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Barba e Cabelo");
      createdServiceId = response.body.id;
    });
  });

  describe("GET /services", () => {
    it("deve listar serviços filtrados por businessId via cookie", async () => {
      const response = await request(app)
        .get("/api/v1/services")
        .set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].businesses_id).toBe(testBusinessId);
    });
  });

  describe("PUT /services/:services_id", () => {
    it("deve atualizar os valores do serviço", async () => {
      const response = await request(app)
        .put(`/api/v1/services/${createdServiceId}`)
        .send({
          name: "Barba, Cabelo e Bigode",
          duration_minutes: "90",
          price: "100.00"
        });

      expect(response.status).toBe(200);
      expect(response.body.price).toBe("100.00");
    });
  });

  describe("DELETE /services/:services_id", () => {
    it("deve remover o serviço e retornar 204", async () => {
      const response = await request(app)
        .delete(`/api/v1/services/${createdServiceId}`);

      expect(response.status).toBe(204);

      const check = await db.select().from(services);
      expect(check.length).toBe(0);
    });
  });
});