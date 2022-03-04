import { Router } from "express";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
// import AuthenticateUserService from "../services/AuthenticateUserService";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
interface Error {
  name: string;
  message: string;
  stack?: string;
}

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  const usersRepository = new UsersRepository();
  const { email, password } = req.body;
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  //@ts-ignore
  delete user.password;
  res.status(200).json({ user, token });
});

export default sessionsRouter;
