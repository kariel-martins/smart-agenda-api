import request from "supertest"
import { app } from "../../../app"

describe("BUSINESS ROUTES", () => {
     const extractCookies = (res: any) =>
    res.headers["set-cookie"].map((c: string) => c.split(";")[0]).join("; ");
})