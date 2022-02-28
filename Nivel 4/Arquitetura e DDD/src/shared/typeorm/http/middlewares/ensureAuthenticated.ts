import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/auth";
import AppError from "../errors/AppError";
type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, config.jwt.secret);
    console.log(decoded);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error("Invalid JWT token");
  }
}
