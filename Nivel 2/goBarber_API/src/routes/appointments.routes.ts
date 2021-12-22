import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post("/", (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return res.status(200).json(appointment);
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
});

appointmentsRouter.get("/", (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

export default appointmentsRouter;
