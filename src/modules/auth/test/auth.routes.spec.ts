import request from "supertest";
import { app } from "../../../app";
import { cookies, saveCookies } from "../../../config/test";

describe("AUTH ROUTES", () => {

  const extractCookies = (res: any) =>
    res.headers["set-cookie"].map((c: string) => c.split(";")[0]).join("; ");

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

      saveCookies(response)

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("usersData");
      expect(response.body).toHaveProperty("businessData");

      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("Deve verificar se o usuário não existe", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email: "mariasilva@email.com",
        password: "DevAdmin@26",
      });

      expect(response.status).toBe(404);

      expect(response.body).toEqual({
        status: "error",
        message: "Usuário não encontrado",
      });
    });
  });

  describe("POST /auth/refresh", () => {
    it("Deve retornar 200 e setar cookies", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh")
        .set("Cookie", cookies);

      expect(response.status).toBe(200);

      const newCookies = response.headers["set-cookie"];

      expect(newCookies).toBeDefined();
      expect(newCookies[0]).toContain("refreshToken");
      expect(newCookies[1]).toContain("accessToken");
    });
  });

  describe("POST /auth/forgout-password", () => {
    it("Deve enviar email", async () => {
      const response = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({
          email: "joao@email.com",
        });

      expect(response.status).toBe(200);

      saveCookies(response)
      const newCookies = response.headers["set-cookie"];

      expect(newCookies).toBeDefined();
      expect(newCookies[0]).toContain("forgotPassword");
      expect(response.body).toEqual({
        message: "Email enviar com sucesso!",
      });
    });

    it("Deve verificar se o email existe!", async () => {
      const response = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({
          email: "joao1234@email.com",
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: "error",
        message: "Usuário não encontrado",
      });
    });
  });

  describe("POST auth/reset-password", () => {
    it("Deve atualizar a senha!", async () => {
      const response = await request(app)
        .post("/api/v1/auth/reset-password")
        .set("Cookie", cookies)
        .send({
          password: "Kariel@18",
          confirmPassword: "Kariel@18",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Senha atualizada com sucesso!",
      });
    });

    it("Deve verificar se as senha coincidem!", async () => {
      const response = await request(app)
        .post("/api/v1/auth/reset-password")
        .set("Cookie", cookies)
        .send({
          password: "Kariel@20",
          confirmPassword: "Kariel@18",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: "error",
        message: "Senhas não coincidem!",
      });
    });
  });

  describe("POST auth/logout", () => {
    it("Deve remove os tokens de acesso e refresh!", async () => {
      const response = await request(app)
        .post("/api/v1/auth/logout")
        .set("Cookie", cookies);

      const newCookies = response.headers["set-cookie"];
      const cookiesStr = Array.isArray(newCookies)
        ? newCookies.join(" ")
        : newCookies;

      expect(newCookies).toBeDefined();
      expect(cookiesStr).toContain("accessToken=;");
      expect(cookiesStr).toContain("refreshToken=;");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Logout realizado com sucesso",
      });
    });
  });
});
