import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeAppointmentService } from "./appointment.factory";

const Appointment = makeAppointmentService()

export const create: RequestHandler = async (req, res) => {
  try {
    const result = await Appointment.create(req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar create",
      context: "Appointment/appointment.controller.ts/create",
    });
  }
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const { Appointment_id } = req.params
    const result = await Appointment.getById(Number(Appointment_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "Appointment/appointment.controller.ts/getById",
    });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const { business_id } = req.params
    const result = await Appointment.update(Number(business_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar update",
      context: "Appointment/appointment.controller.ts/update",
    });
  }
};


export const remove: RequestHandler = async (req, res) => {
  try {
    const { Appointment_id } = req.params
    const result = await Appointment.delete(Number(Appointment_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar remove",
      context: "Appointment/appointment.controller.ts/remove",
    });
  }
};
