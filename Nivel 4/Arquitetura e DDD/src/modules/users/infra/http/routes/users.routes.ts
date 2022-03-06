import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";

import uploadConfig from "@config/upload";

import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const upload = multer(uploadConfig);

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  const createUserService = container.resolve(CreateUserService); //new (usersRepository);
  const { name, email, password } = req.body;

  const user = await createUserService.execute({ name, email, password });

  //@ts-ignore
  delete user.password;

  res.status(200).json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const updateUserAvatarService = container.resolve(
        UpdateUserAvatarService
      );

      const user = await updateUserAvatarService.execute({
        user_id: req.user.id,
        avatarFilename: req.file ? req.file.filename : "",
      });

      //@ts-ignore
      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.status(400).json({
        //@ts-ignore
        error: err.message,
      });
    }
  }
);

export default usersRouter;
