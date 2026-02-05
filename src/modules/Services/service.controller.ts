import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeServiceService } from "./service.factory";

const service = makeServiceService()

export const create: RequestHandler = async (req, res, next) => {
  try {
    const businessId = req.cookies.businessId
    const result = await service.create(businessId, req.body);

    return res.status(201).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const businessId = req.cookies.businessId
    const result = await service.getById(businessId);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { services_id } = req.params
    const result = await service.update(Number(services_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};


export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { services_id } = req.params
    const result = await service.delete(Number(services_id));

    return res.status(204).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
