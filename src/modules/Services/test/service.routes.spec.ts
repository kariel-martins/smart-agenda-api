// service.e2e.spec.ts
import request from "supertest";
import { db } from "../../../database/Client";
import { businesses, services } from "../../../database/Schemas";
import { app } from "../../../app";

describe("Service E2E Routes", () => {
  let testBusinessId: string;
  let createdServiceId: number;

  beforeAll(async () => {

    const [biz] = await db.insert(businesses).values({
      name: "Barbearia do Teste",
      email: "barber@teste.com",
      phone: "1199999999",
      active: true
    }).returning();

    testBusinessId = biz.id;
  });

  describe("POST /services", () => {
    it("deve criar um serviço e retornar 201", async () => {
      const response = await request(app)
        .post("/api/v1/services")
        .set("Cookie", [`businessId=${testBusinessId}`])
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
        .set("Cookie", [`businessId=${testBusinessId}`]);

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