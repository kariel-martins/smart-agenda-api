import { Router } from "express";
import { BusinessCreateValidateion, BusinessDeleteValidateion, BusinessGetByIdValidateion, BusinessUpdateValidateion } from "./dtos/business.dto.schema";
import { create, getAll, getById, remove, update } from "./business.controller";

const businessRoute = Router()

businessRoute.post("/", BusinessCreateValidateion, create)
businessRoute.get("/", getAll)
businessRoute.get("/:business_id", BusinessGetByIdValidateion, getById)
businessRoute.put("/:business_id", BusinessUpdateValidateion, update)
businessRoute.delete("/:business_id", BusinessDeleteValidateion, remove)