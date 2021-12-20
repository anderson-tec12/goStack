import { uuid } from "uuidv4";
import { Router } from "express";

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post("/", (req, res) => {
  const { provider, date } = req.body;

  const appointment = {
    provider,
    date,
    id: uuid(),
  };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
