import { Router } from "express";
import SessionsController from "../controllers/SessionsController";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post("/", sessionsController.create);

export default sessionsRouter;
