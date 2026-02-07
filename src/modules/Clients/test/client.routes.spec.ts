import request from "supertest";
import { db } from "../../../database/Client";
import { businesses, clients } from "../../../database/Schemas";
import { app } from "../../../app";
import { getCookies, saveCookies } from "../../../config/test";

describe("Client E2E Routes", () => {
  let testBusinessId: string;
  let createdClientId: string;

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

  describe("POST /clients", () => {
    it("deve criar um cliente com sucesso usando cookie de businessId", async () => {
      const response = await request(app)
        .post("/api/v1/clients")
        .set("Cookie", getCookies())
        .send({
          name: "Maria Souza",
          email: "maria@teste.com",
          phone: "11988887777"
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Maria Souza");
      expect(response.body.businesses_id).toBe(testBusinessId);
      
      createdClientId = response.body.id;
    });

    it("deve retornar 400 se o email for inválido (Zod)", async () => {
      const response = await request(app)
        .post("/api/v1/clients")
        .set("Cookie", getCookies())
        .send({
          name: "Invalido",
          email: "email-errado",
          phone: "123"
        });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /clients", () => {
    it("deve listar todos os clientes do negócio via cookie", async () => {
      const response = await request(app)
        .get("/api/v1/clients")
        .set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].id).toBe(createdClientId);
    });
  });

  describe("PUT /clients/:client_id", () => {
    it("deve atualizar os dados do cliente", async () => {
      const response = await request(app)
        .put(`/api/v1/clients/${createdClientId}`)
        .set("Cookie", getCookies())
        .send({
          name: "Maria Souza Silva",
          email: "maria.silva@teste.com",
          phone: "11900000000"
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Maria Souza Silva");
    });
  });

  describe("DELETE /clients/:client_id", () => {
    it("deve remover o cliente e retornar 204", async () => {
      const response = await request(app)
        .delete(`/api/v1/clients/${createdClientId}`).set("Cookie", getCookies());

      expect(response.status).toBe(204);

      const check = await db.select().from(clients);
      expect(check.length).toBe(0);
    });
  });
});