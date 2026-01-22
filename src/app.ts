import express from "express"
import cors from "cors"
import { env } from "./config/env";
import { router } from "./routes";
import { errorHandler } from "./core/errors/errorHandler";
import { setupSwagger } from "./config/swagger";

const { frontend_url } = env()
const app = express()

app.use(
  cors({
    origin: frontend_url,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

setupSwagger(app);

export { app }