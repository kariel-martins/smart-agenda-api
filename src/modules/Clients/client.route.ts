import { Router } from "express";
import { create, getById, remove, update } from "./client.controller";
import { clientCreateValidate, clientDeleteValidate, clientUpdateValidate } from "./dtos/client.dto.schema";

const clientRoute = Router()

clientRoute.get("/professionals", getById)
clientRoute.post("/professionals", clientCreateValidate, create)
clientRoute.put("/professionals/:professionals_id", clientUpdateValidate, update)
clientRoute.delete("/professionals/:professionals_id", clientDeleteValidate, remove)

export { clientRoute }