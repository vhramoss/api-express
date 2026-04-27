import { Request, Response, NextFunction } from "express";
import users from "../data/users.json";

export const identityValidator = (req: Request, res: Response, next: NextFunction) => {
  const email  = req.headers['x-user-email'];
  
  if (!email) {
    return res.status(401).json({ message: "User not authenticated" });
  }

    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(401).json({ message: "User not authorized" });
    }

    req.user = user;
    next();
  };
  