export class PasswordService {
  async createPassword(input: string) {
    return input;
  }

  async validatePassword(hash: string) {
    return true;
  }
}
