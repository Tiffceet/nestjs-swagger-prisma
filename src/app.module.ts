import { Module } from "@nestjs/common";
import { InfraModule } from "./infra.module";
import { CoreModule } from "./app/module/core.module";

@Module({
  imports: [InfraModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
