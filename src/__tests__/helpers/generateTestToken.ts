import jwt from "jsonwebtoken";

export function generateTestToken(email = "user1@email.com") {
  return jwt.sign(
    { sub: email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
}
