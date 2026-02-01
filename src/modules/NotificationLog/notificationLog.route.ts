import { Router } from "express";

const notificationRoute = Router()

notificationRoute.get("/notifications/logs")
notificationRoute.get("/notifications/send")

export { notificationRoute }