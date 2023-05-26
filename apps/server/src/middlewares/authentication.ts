import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: number;
  username: string;
  role: string;
}

function authMiddleware(req: Request, res: Response, next: NextFunction): any {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Missing JWT secret" });
  }
  try {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const decodedToken = jwt.verify(
      token.toString(),
      process.env.JWT_SECRET
    ) as DecodedToken;

    delete decodedToken.password;

    req.user = decodedToken;
    return next();
  } catch (e) {
    if (e instanceof Error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }
}

export default authMiddleware;
