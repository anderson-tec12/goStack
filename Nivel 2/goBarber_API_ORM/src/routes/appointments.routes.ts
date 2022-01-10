import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

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
    res.status(err.statusCode).json({
      error: err.message,
    });
  }
});

appointmentsRouter.get("/", async (req, res) => {
  console.log(req.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

export default appointmentsRouter;
