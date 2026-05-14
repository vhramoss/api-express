import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import users from "../data/users.json";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password &&
      u.active
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid credentials" });
  }

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  const token = jwt.sign(
    { sub: user.email },
    secret,
    { expiresIn } as jwt.SignOptions
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({ success: true });
});

router.post("/logout", (res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({ success: true });
});

router.get("/me", jwtAuth, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  return res.status(200).json({
    email: req.user.email,
  });
});

export default router;