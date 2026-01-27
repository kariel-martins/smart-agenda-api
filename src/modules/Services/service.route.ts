import { Router } from "express";
import { create, getById, remove, update } from "./service.controller";
import { serviceCreateValidate, serviceDeleteValidate, serviceUpdateValidate } from "./dtos/service.dto.schema";

const serviceRoute = Router()

serviceRoute.get("/professionals", getById)
serviceRoute.post("/professionals", serviceCreateValidate, create)
serviceRoute.put("/professionals/:professionals_id", serviceUpdateValidate, update)
serviceRoute.delete("/professionals/:professionals_id", serviceDeleteValidate, remove)

export { serviceRoute }