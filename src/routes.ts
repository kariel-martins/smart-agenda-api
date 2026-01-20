import { Router } from "express"
import { userRoute } from "./modules/Users/user.routes"

const router = Router()

router.use("/api/v1/users", userRoute)

export { router }