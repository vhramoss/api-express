import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (password !== "123456") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

  const token = jwt.sign(
    { sub: email },
    secret,
    { expiresIn } as jwt.SignOptions
  );

  return res.status(200).json({ accessToken: token });
});

export default router;
