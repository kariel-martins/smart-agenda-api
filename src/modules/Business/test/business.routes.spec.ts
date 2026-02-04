import request from "supertest"
import { app } from "../../../app"
import { getCookies, saveCookies } from "../../../config/test";

describe("BUSINESS ROUTES", () => {

        it("deve criar uma conta", async () => {
             const response = await request(app).post("/api/v1/auth/register").send({
               name: "Maria",
               nameBusiness: "lojaTest@15",
               phone: "+55 (99) 000009999",
               email: "mariaTest@email.com",
               password: "DevAdmin@26",
               confirmPassword: "DevAdmin@26",
             });
             
             saveCookies(response)
             expect(response.status).toBe(201);
       
             expect(response.body).toHaveProperty("usersData");
             expect(response.body).toHaveProperty("businessData");
       
             expect(response.headers["set-cookie"]).toBeDefined();
           });

    describe("GET bussiness/profile", () => {

        it("Deve retonar os dados da empresa", async () => {
            const responce = await request(app)
            .get("/api/v1/business/profile")
            .set("Cookie", getCookies())

            expect(responce.status).toBe(200)
        })

        it("Deve verificar se a empresa existe!", async () => {
            const responce = await request(app)
            .get("/api/v1/business/profile")
            .set("Cookie", "businessId=e63c6dca-e460-4aa6-8017-74e0e18624ec")

            expect(responce.status).toBe(404)
            expect(responce.body).toEqual({
                status: "error",
                message: "Não foi possível buscar o negócio"
            })
        })
    })
    describe("PUT bussiness/profile", () => {
        it("Deve atualizar a empresa!", async () => {
            const responce = await request(app)
            .put("/api/v1/business/profile")
            .set("Cookie", getCookies())
            .send({
                email: "admin19@gmail.com",
                phone: "99999-99999",
                name: "Barbearia do Desenvolvedor"
            })

            expect(responce.status).toBe(200)
        })
    })
})