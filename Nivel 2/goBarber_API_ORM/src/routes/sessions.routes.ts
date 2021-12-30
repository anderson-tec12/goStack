import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({ email, password });

    //@ts-ignore
    delete user.password;
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
});

export default sessionsRouter;
