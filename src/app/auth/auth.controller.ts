import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./auth.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { User } from "src/generated/prisma-class/user";
import { AuthGuard } from "./auth.guard";
import { AuthUser } from "./auth.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post("register")
  @ApiOkResponse({ type: User })
  async register(@Body() body: AuthDto): Promise<User> {
    const user = await this.authService.register(body.username, body.password);
    return user;
  }

  @HttpCode(200)
  @Post("login")
  @ApiOkResponse({ type: User })
  async login(
    @Body() body: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const { user, accessToken } = await this.authService.signIn(
      body.username,
      body.password,
    );
    response.cookie("token", accessToken, {
      httpOnly: true,
    });
    return user;
  }

  @HttpCode(200)
  @Post("currentUser")
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard)
  async currentUser(@AuthUser() user: { userId: string }) {
    return await this.authService.currentUser(user.userId);
  }

  @HttpCode(200)
  @Post("logout")
  @ApiOkResponse()
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("token", {
      httpOnly: true,
    });
    return;
  }
}