import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dtos/user.dto";

@ApiTags("user")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post("user")
  async createUser(@Body() body: CreateUserDto) {
    this.userService.createUser(body.name);
  }
}
