import { Router } from "express";
import { create, getById, remove, update } from "./availiablility.controller";
import { availiablilityCreateValidate, availiablilityDeleteValidate, availiablilityUpdateValidate } from "./dtos/avaliability.dto.schema";

const availabilityRoute = Router()

availabilityRoute.get("/:professional_id", getById)
availabilityRoute.post("/", availiablilityCreateValidate, create)
availabilityRoute.put("/:availability_id", availiablilityUpdateValidate, update)
availabilityRoute.delete("/:availability_id", availiablilityDeleteValidate, remove)

export { availabilityRoute }