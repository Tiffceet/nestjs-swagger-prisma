import { Module } from "@nestjs/common";
import { UserModule } from "../module/user/user.module";
import { PasswordService } from "./password.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1y" },
    }),
  ],
  providers: [AuthController, PasswordService, AuthService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
