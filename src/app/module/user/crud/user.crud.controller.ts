import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Inject,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import {
  CreateUserDto,
  PaginatedUserEntity,
  UpdateUserDto,
} from "../dtos/user.dto";
import { UserCrudService } from "./user.crud.service";
import { User } from "src/generated/prisma-class/user";

@ApiTags("user/crud")
@Controller("user/crud")
export class UserCrudController {
  constructor(
    private readonly userService: UserService,
    @Inject(UserCrudService)
    private readonly userCrudService: UserCrudService,
  ) {}

  @HttpCode(200)
  @Post("findMany")
  @ApiOkResponse({ type: PaginatedUserEntity })
  async findManyUserPaginated(): Promise<PaginatedUserEntity> {
    return await this.userCrudService.findManyPaginated({});
  }

  @HttpCode(200)
  @Get(":id")
  @ApiOkResponse({ type: User })
  async findOneUser(@Param("id") id: string): Promise<User> {
    return await this.userCrudService.findFirst({ where: { id } });
  }

  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: User })
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.userCrudService.create({
      data: {
        name: body.name,
      },
    });
  }

  @HttpCode(200)
  @Put(":id")
  async updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userCrudService.update({ where: { id }, data: { ...body } });
  }

  @HttpCode(200)
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return await this.userCrudService.delete({ where: { id } });
  }
}
