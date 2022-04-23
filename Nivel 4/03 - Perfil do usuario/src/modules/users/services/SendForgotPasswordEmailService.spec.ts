import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeMailProvider = new FakeMailProvider();

    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it("should be able to recover the passoword using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    await sendForgotPasswordEmailService.execute({
      email: "johndoe@example.com.br",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-existing user password", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await expect(
      sendForgotPasswordEmailService.execute({
        email: "johndoe@example.com.br",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await sendForgotPasswordEmailService.execute({
      email: "johndoe@example.com",
    });

    // tenha sido chamada
    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
