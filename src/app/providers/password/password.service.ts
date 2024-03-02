import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
export class PasswordService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  async hashPassword(password: string) {
    const hash = await bcrypt.hash(
      password,
      this.configService.get<number>("bcryptSaltOrRounds") ?? 10,
    );
    return hash;
  }

  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
