import { Module } from "@nestjs/common";
import { PrismaService } from "src/app/providers/prisma/prisma.service";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserCrudService } from "./crud/user.crud.service";
import { UserCrudController } from "./crud/user.crud.controller";

const services = [UserService, UserCrudService];

const controllers = [UserController, UserCrudController];

@Module({
  imports: [],
  providers: [PrismaService, ...services, ...controllers],
  controllers: [...controllers],
  exports: [...services],
})
export class UserModule {}
