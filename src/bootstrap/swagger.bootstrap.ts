import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "node:fs";
export function bootstrapSwagger(
  app: INestApplication,
  args: {
    appVersion: string;
  },
): void {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("API Title")
    .setDescription("API Description")
    .setVersion(args.appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documentation", app, document);
  writeFileSync("swagger-spec.json", JSON.stringify(document, null, 2), {
    encoding: "utf-8",
  });
}
