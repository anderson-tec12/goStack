import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";

import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
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
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

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
