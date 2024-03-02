import { INestApplication } from "@nestjs/common";
import { Logger } from "nestjs-pino";
export default function bootstrapLogger(app: INestApplication) {
  app.useLogger(app.get(Logger));
}
