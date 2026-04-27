import { Router, Request, Response } from "express";
import users from "../data/users.json";

const authRoutes = Router();

authRoutes.post("/login", (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }


  return res.status(200).json({ message: "Login successful", user });
});

export default authRoutes;