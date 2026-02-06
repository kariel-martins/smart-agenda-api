import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeProfessionalService } from "./professional.factory";

const service = makeProfessionalService()

export const create: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const result = await service.create(token, req.body);

    return res.status(201).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const result = await service.getByIdBusiness(token);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { professional_id } = req.params
    const result = await service.update(Number(professional_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};


export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { professional_id } = req.params
    const result = await service.delete(Number(professional_id));

    return res.status(204).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
