import { Router } from "express";
import { createUsersValidation, updateUsersValidation, usersByIdValidation } from "./dtos/users.dto.schema";
import { create, getAll, getById, remove, update } from "./users.controller";

const usersRoute = Router()

usersRoute.post("/", createUsersValidation, create)
usersRoute.get("/:user_id", usersByIdValidation, getById)
usersRoute.get("/", getAll)
usersRoute.put("/:user_id", updateUsersValidation, update)
usersRoute.delete("/:user_id",usersByIdValidation, remove)

export { usersRoute }