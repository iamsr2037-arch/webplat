import { getPrismaClient } from "./db";
import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getUserByEmail(email: string) {
  const client = await getPrismaClient();
  if (!client) throw new Error("Database unavailable");
  
  return client.user.findUnique({
    where: { email },
  });
}

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const client = await getPrismaClient();
  if (!client) throw new Error("Database unavailable");
  
  const hashedPassword = await hashPassword(password);

  return client.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "CUSTOMER",
    },
  });
}

export async function verifyCredentials(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user || !user.password) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return null;
  }

  return user;
}
