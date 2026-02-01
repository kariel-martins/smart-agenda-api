import { Router } from "express";
import { create, getById, remove, update } from "./noShowRole.controller";
import { noShowRoleCreateValidate, noShowRoleDeleteValidate, noShowRoleUpdateValidate } from "./dtos/noShowRole.dto.schema";


const noShowRuleRoute = Router()

noShowRuleRoute.get("/rules", getById)
noShowRuleRoute.post("/rules", noShowRoleCreateValidate, create)
noShowRuleRoute.put("/rules/:noShowRule_id",noShowRoleUpdateValidate, update)
noShowRuleRoute.delete("/rules/:noShowRule_id",noShowRoleDeleteValidate, remove)

export {noShowRuleRoute }