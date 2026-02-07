import { RequestHandler } from "express";
import { makeUsersService } from "./users.factory";


const service = makeUsersService()

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
    const { user_id } = req.params as { user_id: string}
    const result = await service.getAll(user_id);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const result = await service.getAll(token);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.params as { user_id: string}
    const result = await service.update(user_id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};


export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.params as { user_id: string}
    const result = await service.delete(user_id);

    return res.status(204).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
