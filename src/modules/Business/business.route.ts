import { Router } from "express";
import { BusinessUpdateValidateion } from "./dtos/business.dto.schema";
import { getById, update } from "./business.controller";

const businessRoute = Router()

businessRoute.get("/profile", getById)
businessRoute.put("/profile", BusinessUpdateValidateion, update)

export { businessRoute }