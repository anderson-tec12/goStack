import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const appointmentsRouter = Router();

appointmentsRouter.post("/", async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return res.status(200).json(appointment);
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
});

appointmentsRouter.get("/", async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

export default appointmentsRouter;
