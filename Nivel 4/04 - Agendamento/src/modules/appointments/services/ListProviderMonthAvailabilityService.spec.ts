import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe("ListProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it("should be able to list the month availability from provider ", async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 8, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 9, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 10, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 11, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 12, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 13, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 14, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 15, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 16, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 30, 17, 0, 0),
      provider_id: "fake_1",
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2022, 4, 31, 10, 0, 0),
      provider_id: "fake_1",
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: "fake_1",
      year: 2022,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 30,
          available: false,
        },
        {
          day: 31,
          available: true,
        },
      ])
    );
  });
});
