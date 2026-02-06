import request from "supertest";
import { db } from "../../../database/Client";
import { professionals } from "../../../database/Schemas";
import { app } from "../../../app";
import { getCookies, saveCookies } from "../../../config/test";

describe("Professional E2E Routes", () => {
   let testBusinessId: string;
    let createdProId: number;
  
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
  
  describe("POST /", () => {
    it("deve criar um profissional e retornar 201", async () => {
      const response = await request(app)
        .post("/api/v1/professionals")
        .set("Cookie", getCookies())
        .send({
          name: "Lucas Medeiros",
          specialty: "Fisioterapia",
          role: "MANAGER",
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Lucas Medeiros");
      createdProId = response.body.id;
    });

    it("deve retornar 400 por erro de validação (zod)", async () => {
      const response = await request(app)
        .post("/api/v1/professionals")
        .set("Cookie", getCookies())
        .send({ name: "Incompleto" });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /", () => {
    it("deve listar profissionais do negócio via cookie", async () => {
      const response = await request(app)
        .get("/api/v1/professionals")
        .set("Cookie", getCookies());

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].id).toBe(createdProId);
    });
  });

  describe("PUT /:professional_id", () => {
    it("deve atualizar os dados do profissional", async () => {
      const response = await request(app)
        .put(`/api/v1/professionals/${createdProId}`)
        .send({
          name: "Lucas M. Silva",
          specialty: "Osteopatia",
          role: "ADMIN",
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Lucas M. Silva");
    });
  });

  describe("DELETE /:professional_id", () => {
    it("deve remover o profissional e retornar 204", async () => {
      const response = await request(app).delete(
        `/api/v1/professionals/${createdProId}`,
      );

      expect(response.status).toBe(204);

      const check = await db.select().from(professionals);
      expect(check.length).toBe(0);
    });
  });
});
