import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able update profile ", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: "John tre",
      email: "johntre@exemple.com.br",
    });

    expect(updatedUser.name).toBe("John tre");
    expect(updatedUser.email).toBe("johntre@exemple.com.br");
  });

  it("should not be able to change to another user email ", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    const user = await fakeUsersRepository.create({
      name: "John Tre",
      email: "johntre@example.com.br",
      password: "123123",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "John tre",
        email: "johndoe@example.com.br",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: "John tre",
      email: "johntre@exemple.com.br",
      old_password: "123123",
      password: "123456789",
    });

    expect(updatedUser.password).toBe("123456789");
  });

  it("should not be able to update the password with old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "John tre",
        email: "johntre@exemple.com.br",
        password: "123456789",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "John tre",
        email: "johntre@exemple.com.br",
        old_password: "wrong-old-password",
        password: "123456789",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
