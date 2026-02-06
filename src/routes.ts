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

const router = Router()

router.get("/", (_req: Request, res: Response) => {
    res.status(200).send({message: "Rodando com sucesso!"})
})

router.use("/api/v1/auth", authRoute)
router.use("/api/v1/business", businessRoute)
router.use("/api/v1/professionals", professionalRoute)
router.use("/api/v1/services", serviceRoute)
router.use("/api/v1/clients", clientRoute)
router.use("/api/v1/availability", availabilityRoute)
router.use("/api/v1/appointments", appointmentRoute)
router.use("/api/v1/no-show", noShowRuleRoute)
router.use("/api/v1/notifications", notificationRoute)

export { router }