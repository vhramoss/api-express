import jwt from "jsonwebtoken";

export function generateTestToken(
  email: string = "user1@email.com",
  expiresIn: string = "1h"
) {
  return jwt.sign(
    { sub: email },
    process.env.JWT_SECRET as string,
    { expiresIn } as jwt.SignOptions
  );
}