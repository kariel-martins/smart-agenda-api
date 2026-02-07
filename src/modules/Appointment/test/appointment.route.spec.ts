import request from "supertest";
import { app } from "../../../app";
import { db } from "../../../database/Client";
import {
  appointment,
  professionals,
  clients,
  services,
  businesses,
} from "../../../database/Schemas";
import { getCookies, saveCookies } from "../../../config/test";

describe("Appointment E2E Flow", () => {
  let bizId: string;
  let clientId: string;
  let proId: number;
  let servId: number;
  let appId: number;

  beforeAll(async () => {
    await db.delete(appointment);
    await db.delete(services);
    await db.delete(professionals);
    await db.delete(clients);
    await db.delete(businesses);

    const [biz] = await db
      .insert(businesses)
      .values({ name: "Unissex Hair", email: "hair@test.com", phone: "111" })
      .returning();
    bizId = biz.id;

    const [client] = await db
      .insert(clients)
      .values({
        name: "Cliente Teste",
        email: "c@test.com",
        phone: "222",
        businesses_id: bizId,
      })
      .returning();
    clientId = client.id;

    const [pro] = await db
      .insert(professionals)
      .values({ name: "Pro Teste", specialty: "Corte", businesses_id: bizId })
      .returning();
    proId = pro.id;

    const [serv] = await db
      .insert(services)
      .values({
        name: "Corte",
        duration_minutes: "30",
        price: "50",
        businesses_id: bizId,
      })
      .returning();
    servId = serv.id;
  });

   it("deve criar uma conta", async () => {
        const response = await request(app).post("/api/v1/auth/register").send({
          name: "João",
          nameBusiness: "lojaTest",
          phone: "+55 (99) 000009999",
          email: "joao@email.com",
          password: "DevAdmin@26",
          confirmPassword: "DevAdmin@26",
        });

         saveCookies(response)
  
        expect(response.status).toBe(201);
  
        expect(response.body).toHaveProperty("usersData");
        expect(response.body).toHaveProperty("businessData");
  
        expect(response.headers["set-cookie"]).toBeDefined();
      });

  describe("Fluxo de Agendamento", () => {
    it("POST / - Deve criar agendamento", async () => {
      const response = await request(app)
        .post("/api/v1/appointments")
        .set("Cookie", getCookies())
        .send({
          professional_id: proId,
          service_id: servId,
          client_id: clientId,
          start_time: "10:00",
          end_time: "10:30",
          status: "scheduled",
          date: "2026-02-10",
          day_of_week: "Quarta-feira",
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      appId = response.body.id;
    });

    it("GET / - Deve buscar por data", async () => {
      const response = await request(app)
        .get("/api/v1/appointments")
        .set("Cookie", getCookies())
        .query({ date: "2026-02-10" });

      expect(response.status).toBe(200);
      expect(response.body[0].id).toBe(appId);
    });

    it("PATCH /confirm - Deve confirmar", async () => {
      const response = await request(app)
      .patch(
        `/api/v1/appointments/${appId}/confirm`,
      ).set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("confirmed");
    });

    it("PATCH /cancel - Deve cancelar", async () => {
      const response = await request(app)
        .patch(`/api/v1/appointments/${appId}/cancel`)
        .set("Cookie", getCookies())
        .send({ cancel_reason: "Mudança de planos" });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("canceled");
    });
  });
});
