import { Request, Response, Router } from "express"
import { authRoute } from "./modules/auth/auth.route"
import { businessRoute } from "./modules/Business/business.route"
import { professionalRoute } from "./modules/Professional/professional.routes"
import { serviceRoute } from "./modules/Services/service.route"
import { clientRoute } from "./modules/Clients/client.route"
import { availabilityRoute } from "./modules/Availiability/availiablility.route"
import { appointmentRoute } from "./modules/Appointment/appointment.route"
import { noShowRuleRoute } from "./modules/NoShowRule/noShowRole.route"
import { notificationRoute } from "./modules/NotificationLog/notifications.routes"
import { Authorization } from "./share/middlewares/Autentications"
import { usersRoute } from "./modules/Users/users.route"

const router = Router()

router.get("/", (_req: Request, res: Response) => {
    res.status(200).send({message: "Rodando com sucesso!"})
})

router.use("/api/v1/auth", authRoute)
router.use("/api/v1/business", businessRoute)
router.use("/api/v1/professionals", Authorization(["admin"]), professionalRoute)
router.use("/api/v1/services", Authorization(["admin"]), serviceRoute)
router.use("/api/v1/clients", Authorization(["admin", "manager", "staff"]),clientRoute)
router.use("/api/v1/availability", Authorization(["admin","manager", "staff"]), availabilityRoute)
router.use("/api/v1/appointments", Authorization(["admin","manager", "staff"]),appointmentRoute)
router.use("/api/v1/no-show", noShowRuleRoute)
router.use("/api/v1/notifications", notificationRoute)
router.use("/api/v1/users", Authorization(["admin"]),usersRoute)

export { router }