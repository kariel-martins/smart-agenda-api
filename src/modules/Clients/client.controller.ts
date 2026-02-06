import { RequestHandler } from "express";
import { makeClientService } from "./client.factory";

const service = makeClientService();

export const create: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const result = await service.create(token, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

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
    const { client_id } = req.params;
    const result = await service.update(String(client_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { client_id } = req.params;
    const result = await service.delete(String(client_id));

    return res.status(204).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
