import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserCrudService } from "../module/user/crud/user.crud.service";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userCrudService: UserCrudService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id },
      {
        expiresIn: this.configService.get("jwt.accessExpiresIn"),
        secret: this.configService.get("jwt.accessSecret"),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { userId: user.id },
      {
        expiresIn: this.configService.get("jwt.refreshExpiresIn"),
        secret: this.configService.get("jwt.refreshSecret"),
      },
    );

    return { user, accessToken, refreshToken };
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

  async refreshToken(token: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(token);
      const user = await this.userCrudService.findFirst({
        where: { id: userId },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      const accessToken = await this.jwtService.signAsync(
        { userId: user.id },
        {
          expiresIn: this.configService.get("jwt.accessExpiresIn"),
          secret: this.configService.get("jwt.accessSecret"),
        },
      );

      const refreshToken = await this.jwtService.signAsync(
        { userId: user.id },
        {
          expiresIn: this.configService.get("jwt.refreshExpiresIn"),
          secret: this.configService.get("jwt.refreshSecret"),
        },
      );
      return { accessToken, refreshToken };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
