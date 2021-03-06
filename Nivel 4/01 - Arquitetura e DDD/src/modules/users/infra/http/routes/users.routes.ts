import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const upload = multer(uploadConfig);

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
