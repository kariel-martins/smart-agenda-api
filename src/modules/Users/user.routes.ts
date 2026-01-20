import { Router } from "express";
import { validationCreateUsers } from "./dtos/users.dto.schemas";
import { createUsers } from "./user.controller";

const userRoute = Router()

userRoute.post("/", validationCreateUsers, createUsers)

export { userRoute }