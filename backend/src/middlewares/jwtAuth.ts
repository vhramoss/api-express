import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import users from "../data/users.json";

interface JwtPayload {
  sub: string;
}

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const email = decoded.sub;

    const user = users.find(
      (u) => u.email === email && u.active
    );

    if (!user) {
      return res.status(401).json({ message: "Unauthorized email" });
    }

    req.user = { email };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}