import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto, LoginResponse } from "./auth.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { User } from "src/generated/prisma-class/user";
import { AuthGuard } from "./auth.guard";
import { AuthUser } from "./auth.decorator";
import { Request } from "express";
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
  @ApiOkResponse({ type: LoginResponse })
  async login(
    @Body() body: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    const { userId, accessToken, refreshToken } = await this.authService.signIn(
      body.username,
      body.password,
    );
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    return { userId };
  }

  @HttpCode(200)
  @Post("refreshToken")
  @ApiOkResponse()
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      request.cookies.refreshToken,
    );
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
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
