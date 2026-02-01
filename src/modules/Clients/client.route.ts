import { Router } from "express";
import { create, getById, remove, update } from "./client.controller";
import { clientCreateValidate, clientDeleteValidate, clientUpdateValidate } from "./dtos/client.dto.schema";

const clientRoute = Router()

clientRoute.get("/", getById)
clientRoute.post("/", clientCreateValidate, create)
clientRoute.put("/:client_id", clientUpdateValidate, update)
clientRoute.delete("/:client_id", clientDeleteValidate, remove)

export { clientRoute }