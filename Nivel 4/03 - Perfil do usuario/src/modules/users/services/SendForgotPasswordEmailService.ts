// import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

import { inject, injectable } from "tsyringe";

// import User from "../infra/typeorm/entities/User";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";

type Request = {
  email: string;
};

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("userTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, "Pedido de recuperação recebido");
  }
}

export default SendForgotPasswordEmailService;
