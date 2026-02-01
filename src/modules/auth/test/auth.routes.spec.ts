import request from "supertest";
import { app } from "../../../app";
import { db } from "../../../database/Client";
import { businesses, refresh_tokens, users } from "../../../database/Schemas";
import { response } from "express";

describe("AUTH ROUTES", () => {
  describe("POST /auth/register", () => {
    it("Deve verifcar se as senha coincidem", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        name: "João",
        nameBusiness: "lojaTest",
        phone: "+55 (99) 000009999",
        email: "joao@email.com",
        password: "DevAdmin@17",
        confirmPassword: "DevAdmin@26",
      });

      expect(response.status).toBe(400);

      expect(response.body).toEqual({
        status: "error",
        message: "Senhas não coincidem",
      });
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

      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty("usersData");
      expect(response.body).toHaveProperty("businessData");

      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("Deve verificar se o email já existe!", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        name: "João",
        nameBusiness: "lojaTest",
        phone: "+55 (99) 000009999",
        email: "joao@email.com",
        password: "DevAdmin@26",
        confirmPassword: "DevAdmin@26",
      });

      expect(response.statusCode).toBe(409);
      expect(response.body).toEqual({
        status: "error",
        message: "Usuário já existe",
      });
    });
  });

  describe("POST /auth/login", () => {
    it("Deve autenticar usuário", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "joao@email.com",
        password: "DevAdmin@26",
      });

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("usersData");
      expect(response.body).toHaveProperty("businessData");

      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("Deve verificar se o usuário existe", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "mariasilva@email.com",
        password: "DevAdmin@26",
      });

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("usersData");
      expect(response.body).toHaveProperty("businessData");

      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });
});
