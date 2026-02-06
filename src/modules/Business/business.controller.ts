import { RequestHandler } from "express";
import { makeBusinessService } from "./business.factory";

const service = makeBusinessService();

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const result = await service.getById(token);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const result = await service.update(token, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
