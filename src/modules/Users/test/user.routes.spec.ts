import request from "supertest"
import { app } from "../../../app" // seu express

describe("POST /users", () => {

  it("deve criar usuário", async () => {

    const response = await request(app)
      .post("/api/v1/users/signup")
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
