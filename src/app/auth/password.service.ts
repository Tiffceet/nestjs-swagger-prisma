import * as bcrypt from "bcrypt";

export class PasswordService {
  async createPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
