import { Router } from "express";
import { cancel, complete, confirm, create, getByDate, noShow } from "./appointment.controller";
import { appointmentByDateValidate, appointmentByIdValidate, appointmentCreateValidate, appointmentUpdateValidate } from "./dtos/appointment.dto.schema";

const appointmentRoute = Router()

appointmentRoute.get("/", appointmentByDateValidate, getByDate)
appointmentRoute.post("/",appointmentCreateValidate, create)
appointmentRoute.patch("/:appointments_id/confirm",appointmentByIdValidate, confirm)
appointmentRoute.patch("/:appointments_id/complete",appointmentByIdValidate, complete)
appointmentRoute.patch("/:appointments_id/cancel",appointmentByIdValidate, cancel)
appointmentRoute.patch("/:appointments_id/no-show",appointmentByIdValidate, noShow)

export { appointmentRoute }