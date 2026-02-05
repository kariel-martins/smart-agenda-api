import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeNoShowRoleService } from "./noShowRole.factory";

const NoShowRole = makeNoShowRoleService();

export const create: RequestHandler = async (req, res, next) => {
  try {
     const businessId = req.cookies.businessId;
    const result = await NoShowRole.create(businessId, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const businessId = req.cookies.businessId;
    const result = await NoShowRole.getById(businessId);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { noShowRule_id } = req.params;
    const result = await NoShowRole.update(Number(noShowRule_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { noShowRule_id } = req.params;
    await NoShowRole.delete(Number(noShowRule_id));

    return res.status(204).json({});
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
