import { Request, Response } from "express";

import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: "anderson@gmail.com",
    name: "Anderson B. Silva",
    password: "123",
    techs: [
      "Javascript",
      {
        title: "React",
        experience: 80,
      },
    ],
  });

  return response.json(user);
}
