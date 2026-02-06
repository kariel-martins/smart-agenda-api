import { RequestHandler } from "express";
import { makeAvailiablilityService } from "./availiablility.factory";

const Availiablility = makeAvailiablilityService()

export const create: RequestHandler = async (req, res, next) => {
  try {
    const result = await Availiablility.create(req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const { professional_id } = req.params

    const result = await Availiablility.getById(Number(professional_id));

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const { availability_id } = req.params
    const result = await Availiablility.update(Number(availability_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};


export const remove: RequestHandler = async (req, res, next) => {
  try {
    const { availability_id } = req.params
    const result = await Availiablility.delete(Number(availability_id));

    return res.status(204).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
