import { Request, Response } from "express";

import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import ShowProfileService from "@modules/users/services/ShowProfileService";

import { container } from "tsyringe";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    user.password = "";
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const updateProfile = container.resolve(UpdateProfileService); //new (usersRepository);
    const { name, email, password, old_password } = request.body;

    const user = await updateProfile.execute({
      name,
      email,
      password,
      old_password,
      user_id,
    });

    //@ts-ignore
    delete user.password;

    return response.status(200).json(user);
  }
}
