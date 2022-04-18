import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

// index, show, create, update, delete
export default class SessionsCOntroller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService); //new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    //@ts-ignore
    delete user.password;
    return response.status(200).json({ user, token });
  }
}
