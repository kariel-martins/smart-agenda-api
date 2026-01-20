import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { env } from "../../config/env"

const { debug } = env()
const DEBUG = debug === "true"

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if ( err instanceof AppError ) {
        console.error(
            `[APP ERROR] ${err.context ?? "APP"} -> ${err.message}`
        )

        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    if ( DEBUG ) {
        console.error(`[UNEXPECTED] ${err.message}`, { stack: err.stack })
    } else {
        console.error(`[UNEXPECTED] ${err.message}`)
    }

    return res.status(500).json({
        status: "error",
        message: "Erro interno no servidor"
    })
}