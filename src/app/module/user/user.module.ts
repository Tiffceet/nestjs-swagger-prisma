import { Module } from "@nestjs/common";
import { PrismaService } from "src/app/providers/prisma/prisma.service";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
  imports: [],
  providers: [PrismaService, UserController, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
