import { Router } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post("/", async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService); //new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return res.status(200).json(appointment);
});

// appointmentsRouter.get("/", async (req, res) => {
//   console.log(req.user);
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

export default appointmentsRouter;
