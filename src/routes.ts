import { Request, Response, Router } from "express"
import { userRoute } from "./modules/Users/user.routes"
import { authRoute } from "./modules/auth/auth.route"

const router = Router()

router.get("/", (_req: Request, res: Response) => {
    res.status(200).send({message: "Rodando com sucesso!"})
})

router.use("/api/v1/auth", authRoute)
router.use("/api/v1/users", userRoute)
router.use("/api/v1/business", userRoute)

export { router }