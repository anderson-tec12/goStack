import path from "path";
import fs from "fs";

import IUsersRepository from "../repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";

import UploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    }

    if (user.avatar) {
      // deletar o avatar anterior

      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
