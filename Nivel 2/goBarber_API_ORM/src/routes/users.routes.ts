import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    const createUserService = new CreateUserService();
    const { name, email, password } = req.body;

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
});

export default usersRouter;
