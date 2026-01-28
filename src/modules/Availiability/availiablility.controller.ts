import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeAvailiablilityService } from "./availiablility.factory";

const Availiablility = makeAvailiablilityService()

export const create: RequestHandler = async (req, res) => {
  try {
    const result = await Availiablility.create(req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar create",
      context: "Availiablility/availiablility.controller.ts/create",
    });
  }
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const { Availiablility_id } = req.params
    const result = await Availiablility.getById(Number(Availiablility_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "Availiablility/availiablility.controller.ts/getById",
    });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const { business_id } = req.params
    const result = await Availiablility.update(Number(business_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar update",
      context: "Availiablility/availiablility.controller.ts/update",
    });
  }
};


export const remove: RequestHandler = async (req, res) => {
  try {
    const { Availiablility_id } = req.params
    const result = await Availiablility.delete(Number(Availiablility_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar remove",
      context: "Availiablility/availiablility.controller.ts/remove",
    });
  }
};
