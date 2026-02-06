import { RequestHandler } from "express";
import { makeNoShowRoleService } from "./noShowRole.factory";

const NoShowRole = makeNoShowRoleService();

export const create: RequestHandler = async (req, res, next) => {
  try {
     const token = req.cookies.accessToken;
    const result = await NoShowRole.create(token, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const result = await NoShowRole.getById(token);

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
