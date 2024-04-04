import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import bootstrapLogger from "./bootstrap/logger.bootstrap";
import { bootstrapSwagger } from "./bootstrap/swagger.bootstrap";
import bootstrapRequestInterceptor from "./bootstrap/request-interceptor.bootstrap";
import { Logger } from "@nestjs/common";
import bootstrapCookieParser from "./bootstrap/cookie-parser.bootstrap";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  bootstrapSwagger(app, { appVersion: "1.0" });
  bootstrapLogger(app);
  bootstrapRequestInterceptor(app);
  bootstrapCookieParser(app);

  await app.listen(process.env.PORT ?? 8000);
  Logger.log(`App listening on port ${process.env.PORT ?? 8000}`);
  Logger.log(
    `Swagger docs available at http://localhost:${process.env.PORT ?? 8000}/documentation`,
  );
}
bootstrap();
