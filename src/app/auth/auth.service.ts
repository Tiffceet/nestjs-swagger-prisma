import { Injectable, NotFoundException } from "@nestjs/common";
import { UserCrudService } from "../module/user/crud/user.crud.service";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userCrudService: UserCrudService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    return await this.userCrudService.create({
      data: {
        username: username,
        password: await this.passwordService.createPassword(password),
      },
    });
  }

  async signIn(username: string, password: string) {
    const user = await this.userCrudService.findFirst({
      where: {
        username,
        password,
      },
    });

    const accessToken = await this.jwtService.signAsync({ userId: user.id });

    return { user, accessToken };
  }

  async currentUser(userId: string) {
    const user = await this.userCrudService.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
