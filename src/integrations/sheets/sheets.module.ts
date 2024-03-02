import { Global, Module } from '@nestjs/common';
import { SheetsService } from './sheets.service';
@Global()
@Module({
  controllers: [],
  exports: [SheetsService],
  imports: [],
  providers: [SheetsService],
})
export class SheetsModule {}
