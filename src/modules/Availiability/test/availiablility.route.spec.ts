import request from "supertest";
import { businesses, professionals } from "../../../database/Schemas";
import { db } from "../../../database/Client";
import { app } from "../../../app";
import { getCookies, saveCookies } from "../../../config/test";

describe("Availability E2E Routes", () => {
  let professionalId: number;
  let availabilityId: number;
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
    businessId = response.body.usersData.business_id;
  });

  describe("POST /availability", () => {
    it("deve criar uma disponibilidade", async () => {
      const [pro] = await db
        .insert(professionals)
        .values({
          name: "Dr. House",
          specialty: "Diagnostic",
          businesses_id: businessId,
          is_active: true,
        })
        .returning();
      professionalId = pro.id;

      const response = await request(app)
        .post("/api/v1/availability")
        .send({
          day_of_week: "Segunda-feira",
          start_time: "09:00",
          end_time: "18:00",
          professional_id: professionalId,
        }).set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      availabilityId = response.body.id;
    });

    it("deve falhar se o professional_id não existir (Erro de FK ou Validação)", async () => {
      const response = await request(app)
        .post("/api/v1/availability")
        .send({
          day_of_week: "Terça",
          start_time: "09:00",
          end_time: "18:00",
          professional_id: 99999,
        }).set("Cookie", getCookies());;

      expect(response.status).not.toBe(200);
    });
  });

  describe("GET /availability/:professional_id", () => {
    it("deve retornar a disponibilidade do profissional", async () => {
      const response = await request(app)
        .get(`/api/v1/availability/${professionalId}`).set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(response.body.professional_id).toBe(professionalId);
    });
  });

  describe("PUT /availability/:availability_id", () => {
    it("deve atualizar o horário da disponibilidade", async () => {
      const response = await request(app)
        .put(`/api/v1/availability/${availabilityId}`)
        .send({
          day_of_week: "Segunda-feira",
          start_time: "10:00",
          end_time: "19:00",
          professional_id: professionalId,
        }).set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(response.body.start_time).toBe("10:00");
    });
  });

  describe("DELETE /availability/:availability_id", () => {
    it("deve remover uma disponibilidade", async () => {
      const response = await request(app)
        .delete(`/api/v1/availability/${availabilityId}`).set("Cookie", getCookies());

      expect(response.status).toBe(204);
      const check = await request(app).get(
        `/api/v1/availability/${professionalId}`,
      ).set("Cookie", getCookies());
      expect(check.body).not.toHaveProperty("id", availabilityId);
    });
  });
});
