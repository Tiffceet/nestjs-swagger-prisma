import { Module } from "@nestjs/common";
import { InfraModule } from "./infra.module";
import { CoreModule } from "./app/module/core.module";
import { AuthModule } from "./app/auth/auth.module";

@Module({
  imports: [InfraModule, AuthModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
