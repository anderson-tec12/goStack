import { Router } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const authenticateUser = container.resolve(AuthenticateUserService); //new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  //@ts-ignore
  delete user.password;
  res.status(200).json({ user, token });
});

export default sessionsRouter;
