import { Module } from "@nestjs/common";
import { PrismaService } from "src/app/providers/prisma/prisma.service";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserCrudService } from "./crud/user.crud.service";
import { UserCrudController } from "./crud/user.crud.controller";

@Module({
  imports: [],
  providers: [
    PrismaService,
    UserController,
    UserService,
    UserCrudService,
    UserCrudController,
  ],
  controllers: [UserController, UserCrudController],
  exports: [UserService],
})
export class UserModule {}
