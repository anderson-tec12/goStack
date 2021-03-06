import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProvider({
      except_user_id: user_id,
    });

    if (!users) {
      throw new AppError("Users not found");
    }

    return users;
  }
}

export default ListProvidersService;
