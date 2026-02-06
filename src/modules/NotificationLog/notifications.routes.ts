import { Router } from "express";
import { send, logs } from "./notifications.controller";

const notificationRoute = Router();

notificationRoute.get("/logs", logs);
notificationRoute.post("/send", send);

export { notificationRoute };
