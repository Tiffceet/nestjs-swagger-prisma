import { Module } from '@nestjs/common';
import { InfraModule } from './infra.module';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
