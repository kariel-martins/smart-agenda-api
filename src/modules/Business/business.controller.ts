import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeBusinessService } from "./business.factory";

const service = makeBusinessService();

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const businessId = req.cookies.businessId;
    const result = await service.getById(businessId);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const businessId = req.cookies.businessId;
    const result = await service.update(businessId, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
