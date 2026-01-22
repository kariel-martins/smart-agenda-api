import { Router } from "express";
import { createUsersValidation, loginValidation } from "./dtos/auth.dto.schema";
import { createUser, login } from "./auth.controller";

const authRoute = Router()

authRoute.post("/register", createUsersValidation, createUser)
authRoute.post("/login", loginValidation, login)

export { authRoute }