import { Request, Response } from "express";

import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

import { container } from "tsyringe";

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatarService = container.resolve(
        UpdateUserAvatarService
      );

      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file ? request.file.filename : "",
      });

      //@ts-ignore
      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({
        //@ts-ignore
        error: err.message,
      });
    }
  }
}
