import { Router } from "express";
import { BusinessCreateValidateion, BusinessDeleteValidateion, BusinessGetByIdValidateion, BusinessUpdateValidateion } from "./dtos/business.dto.schema";
import { getById, update } from "./business.controller";

const businessRoute = Router()

businessRoute.get("/profile", BusinessGetByIdValidateion, getById)
businessRoute.put("/profile", BusinessUpdateValidateion, update)

// 