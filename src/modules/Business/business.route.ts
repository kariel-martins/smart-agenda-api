import { Router } from "express";
import { BusinessGetByIdValidateion, BusinessUpdateValidateion } from "./dtos/business.dto.schema";
import { get, update } from "./business.controller";

const businessRoute = Router()

businessRoute.get("/profile", BusinessGetByIdValidateion, get)
businessRoute.put("/profile", BusinessUpdateValidateion, update)

// 