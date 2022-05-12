import { Router } from "express";
import SessionsController from "../controllers/SessionsController";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const passwordRouter = Router();
const passwordController = new passwordController();

passwordRouter.post("/", passwordController.create);

export default passwordRouter;
