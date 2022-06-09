import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvailability from "./ListProviderDayAvailability";

let listProviderDayAvailability: ListProviderDayAvailability;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe("ListProviderDayAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository
    );
  });

  it("should be able to list the day availability from provider ", async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 15, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 14, 0, 0),
      provider_id: "fake_1",
    });

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2022, 4, 30, 11, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: "fake_1",
      year: 2022,
      month: 5,
      day: 30,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 13,
          available: true,
        },
        {
          hour: 14,
          available: false,
        },
        {
          hour: 15,
          available: false,
        },
        {
          hour: 16,
          available: true,
        },
      ])
    );
  });
});
