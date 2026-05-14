import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import users from "../data/users.json";

interface JwtPayload {
  sub: string;
}

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
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
      return res.status(401).json({ message: "UUsuário não autorizado" });
    }

    req.user = { email };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}