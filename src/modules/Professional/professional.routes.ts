import { Router } from "express";
import { create, getById, remove, update } from "./professional.controller";
import { professionalCreateValidate, professionalDeleteValidate, professionalUpdateValidate } from "./dtos/professional.dto.schema";

const professionalRoute = Router()

professionalRoute.get("/", getById)
professionalRoute.post("/", professionalCreateValidate, create)
professionalRoute.put("/:professional_id", professionalUpdateValidate, update)
professionalRoute.delete("/:professional_id", professionalDeleteValidate, remove)

export { professionalRoute }