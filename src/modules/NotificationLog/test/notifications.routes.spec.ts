import request from "supertest";
import { app } from "../../../app";
import { db } from "../../../database/Client";
import { notification_logs, appointment, businesses, clients, professionals, services } from "../../../database/Schemas";
import { randomUUID } from "crypto";

describe("Notifications - Testes E2E", () => {
  let idAgendamentoTeste: number;
  let idNegocioTeste: string;

  beforeAll(async () => {
    await db.delete(notification_logs);
    await db.delete(appointment);
    await db.delete(services);
    await db.delete(professionals);
    await db.delete(clients);
    await db.delete(businesses);

    const [biz] = await db.insert(businesses).values({
      name: "Barbearia Teste",
      email: "contato@teste.com",
      phone: "1199999999"
    }).returning();
    idNegocioTeste = biz.id;

    const [client] = await db.insert(clients).values({
      name: "Cliente teste",
      email: "emailCleint@teste.com",
      phone: "1199999999",
      businesses_id: idNegocioTeste
    }).returning();

    const [pro] = await db.insert(professionals).values({
      name: "Profissional 1",
      specialty: "corte de teste",
      businesses_id: idNegocioTeste
    }).returning();

    const [serv] = await db.insert(services).values({
      name: "Corte Simples",
      duration_minutes: "30",
      price: "50",
      businesses_id: idNegocioTeste
    }).returning();

    const [appo] = await db.insert(appointment).values({
      businesses_id: idNegocioTeste,
      client_id: client.id,
      professional_id: pro.id,
      service_id: serv.id,
      date: "2026-02-10",
      start_time: "14:00",
      end_time: "15:00",
      status: "scheduled"
    }).returning();

    idAgendamentoTeste = appo.id;
  });

  describe("POST /notifications/send", () => {
    it("deve enfileirar uma notificação (202)", async () => {
      const resposta = await request(app)
        .post("/api/v1/notifications/send")
        .send({
          appointment_id: idAgendamentoTeste,
          type: "reminder"
        });

      expect(resposta.status).toBe(202);
      expect(resposta.body.queued).toBe(true);
    });

    it("deve retornar 409 ao tentar enviar duplicata", async () => {
      await db.insert(notification_logs).values({
        appointment_id: idAgendamentoTeste,
        type: "duplicate_test",
        status: "sent"
      });
      await db.insert(notification_logs).values({
        appointment_id: idAgendamentoTeste,
        type: "duplicate_test",
        status: "sent"
      });

      const resposta = await request(app)
        .post("/api/v1/notifications/send")
        .send({
          appointment_id: idAgendamentoTeste,
          type: "duplicate_test"
        });

      expect(resposta.status).toBe(409);
      expect(resposta.body.message).toBe("Notificação já enviada");
    });
  });

  describe("GET /notifications/logs", () => {
    it("deve retornar lista de logs e filtrar por status", async () => {
      const resposta = await request(app)
        .get("/api/v1/notifications/logs")
        .query({ status: "sent" });

      expect(resposta.status).toBe(200);
      expect(Array.isArray(resposta.body)).toBe(true);
      expect(resposta.body.length).toBeGreaterThan(0);
    });
  });
});