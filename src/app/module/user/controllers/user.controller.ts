import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";

@ApiTags("user")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
