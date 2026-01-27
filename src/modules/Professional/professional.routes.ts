import { Router } from "express";
import { create, getById, remove, update } from "./professional.controller";
import { professionalCreateValidate, professionalDeleteValidate, professionalUpdateValidate } from "./dtos/professional.dto.schema";

const professionalRoute = Router()

professionalRoute.get("/professionals", getById)
professionalRoute.post("/professionals", professionalCreateValidate, create)
professionalRoute.put("/professionals/:professionals_id", professionalUpdateValidate, update)
professionalRoute.delete("/professionals/:professionals_id", professionalDeleteValidate, remove)

export { professionalRoute }