import { Router } from "express";
import { create, getById, remove, update } from "./service.controller";
import { serviceCreateValidate, serviceDeleteValidate, serviceUpdateValidate } from "./dtos/service.dto.schema";

const serviceRoute = Router()

serviceRoute.get("/", getById)
serviceRoute.post("/", serviceCreateValidate, create)
serviceRoute.put("/:services_id", serviceUpdateValidate, update)
serviceRoute.delete("/:services_id", serviceDeleteValidate, remove)

export { serviceRoute }