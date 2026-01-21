import { Request, Response, Router } from "express"
import { userRoute } from "./modules/Users/user.routes"

const router = Router()

router.get("/", (_req: Request, res: Response) => {
    res.status(200).send({message: "Rodando com sucesso!"})
})

router.use("/users", userRoute)

export { router }