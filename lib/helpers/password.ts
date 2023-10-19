import * as bcrypt from "bcrypt";

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(password, hashedPassword);
}

export async function hashPassword(password: string) {
  return bcrypt.hashSync(password, 4);
}
