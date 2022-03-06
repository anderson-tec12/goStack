import { Request, Response } from "express";

import CreateUserService from "@modules/users/services/CreateUserService";

import { container } from "tsyringe";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService); //new (usersRepository);
    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, email, password });

    //@ts-ignore
    delete user.password;

    return response.status(200).json(user);
  }
}
