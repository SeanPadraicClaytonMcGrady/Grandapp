import { Request, Response, NextFunction } from "express";

export function ensureSenior(req: Request, res: Response, next: NextFunction) {
  req.user = {
    id: 1,
    username: "Mr. Darcy",
    role: "senior",
  };
  next();
}

export function ensureVolunteer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.user = {
    id: 4,
    username: "Sadie",
    role: "volunteer",
  };
  next();
}

// Convert data from JWT into information for this ensureSenior & ensureVolunteer.
