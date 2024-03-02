import { Global, Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { LoggerModule } from "nestjs-pino";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: true,
            translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
            ignore: "pid,hostname,req,res,headers",
          },
        },
      },
    }),
  ],
})
export class InfraModule {}
