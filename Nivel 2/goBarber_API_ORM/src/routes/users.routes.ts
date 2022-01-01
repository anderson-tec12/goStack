import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    const createUserService = new CreateUserService();
    const { name, email, password } = req.body;

    const user = await createUserService.execute({ name, email, password });

    //@ts-ignore
    delete user.password;

    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (req, res) => {
    console.log(req.file?.filename);
    return res.json({ ok: true });
  }
);

export default usersRouter;
