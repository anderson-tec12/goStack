import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import ResetPasswordService from "./ResetPasswordService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe("ResetPasswordService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123456",
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPasswordService.execute({
      password: "123123",
      token: userToken.token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toBeCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });

  it("should not be able to reset the password  with non-existing token", async () => {
    await expect(
      resetPasswordService.execute({
        password: "123123",
        token: "non-existing",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password  with non-existing user", async () => {
    const { token } = await fakeUserTokensRepository.generate(
      "non-existing-user"
    );

    await expect(
      resetPasswordService.execute({
        password: "123123",
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password  if passed more than 2 hours", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123456",
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: "123123",
        token: userToken.token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
