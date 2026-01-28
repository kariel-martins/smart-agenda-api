import { Router } from "express";
import { create, getById, remove, update } from "./availiablility.controller";
import { availiablilityCreateValidate, availiablilityDeleteValidate, availiablilityUpdateValidate } from "./dtos/service.dto.schema";

const availabilityRoute = Router()

availabilityRoute.get("/professionals", getById)
availabilityRoute.post("/professionals", availiablilityCreateValidate, create)
availabilityRoute.put("/professionals/:professionals_id", availiablilityUpdateValidate, update)
availabilityRoute.delete("/professionals/:professionals_id", availiablilityDeleteValidate, remove)

export { availabilityRoute }