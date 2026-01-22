import request from "supertest"
import { app } from "../../../app" // seu express

describe("POST /Auth", () => {

  it("deve criar usuário", async () => {

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "João",
        email: "joao@email.com",
        password: "DevAdmin@26",
        comfirmPassword: "DevAdmin@26"
      })

    expect(response.status).toBe(201)
    expect(response.body.email).toBeDefined()
  })

})
