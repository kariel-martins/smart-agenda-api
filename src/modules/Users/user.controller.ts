import { RequestHandler } from "express"
import { UserService } from "./user.service"
import { AppError } from "../../core/errors/AppError"

const service = new UserService()

export const createUsers: RequestHandler = async (req, res) => {
    try {
        const result = await service.RegisterUser(req.body)

        return res.status(201).json(result)
    } catch (error) {
        if( error instanceof AppError) {
            return res.status(error.statusCode).json({errors: { default: error.message }})
        }
        res.status(500).json({
            message: "Erro ao processar createUsers",
            context: "users/controllers/users.controller.ts/createUsers"
        })
    }
}