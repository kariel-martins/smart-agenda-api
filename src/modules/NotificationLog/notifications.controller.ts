import { RequestHandler } from "express";
import { makeNotificationsService } from "./notifications.factory";

const Notifications = makeNotificationsService();

export const send: RequestHandler = async (req, res, next) => {
  try {
    const result = await Notifications.enqueue(req.body);
    return res.status(202).json(result);
  } catch (error) {
    if (res.headersSent) return;
    next(error);
  }
};

export const logs: RequestHandler = async (req, res, next) => {
  try {
    const { status } = req.query;

    const result = await Notifications.getLogs(
      status as string | undefined
    );

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return;
    next(error);
  }
};
