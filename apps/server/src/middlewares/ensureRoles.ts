import { Request, Response, NextFunction } from "express";

export function ensureSenior(req: Request, res: Response, next: NextFunction) {
  next();
}

export function ensureVolunteer(req: Request, res: Response, next: NextFunction) {
  req.user = {
    id: 5,
    username: "Stewart",
    role: "volunteer"
  }
  next();
}