import { Router } from "express";
import { createUsersValidation, forgotPasswordValidation, loginValidation,  resetPasswordValidation } from "./dtos/auth.dto.schema";
import { createUser, forgotPassword, login, logout, refresh, resetPassword } from "./auth.controller";

const authRoute = Router()

authRoute.post("/register", createUsersValidation, createUser)
authRoute.post("/login", loginValidation, login)
authRoute.post("/refresh", refresh)
authRoute.post("/logout", logout)
authRoute.post("/forgot-password", forgotPasswordValidation, forgotPassword)
authRoute.post("/reset-password", resetPasswordValidation, resetPassword)

export { authRoute }