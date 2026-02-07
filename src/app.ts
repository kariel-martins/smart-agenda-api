import express from "express"
import cors from "cors"
import { router } from "./routes";
import { errorHandler } from "./core/errors/errorHandler";
import { setupSwagger } from "./config/swagger";
import cookieParser from "cookie-parser"

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.use(router)
app.use(errorHandler)

setupSwagger(app);

export { app }