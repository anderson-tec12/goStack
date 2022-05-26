import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it("should be able to list  the providers ", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    const user2 = await fakeUsersRepository.create({
      name: "John tre",
      email: "johntre@example.com.br",
      password: "123123",
    });

    const loggedUSer = await fakeUsersRepository.create({
      name: "John Four",
      email: "johnfour@example.com.br",
      password: "123123",
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUSer.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
