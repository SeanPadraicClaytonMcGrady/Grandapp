import { NextFunction, Request, Response } from "express";

export default function authentication(req: Request, res: Response, next: NextFunction) {
  // extract jwt info
  req.user = {
    id: 1,
    username: "Mr. Darcy",
    role: "senior",
  }

  next();
}