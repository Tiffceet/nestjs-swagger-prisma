import { INestApplication } from '@nestjs/common';
import { HttpRequestInterceptor } from 'src/interceptors/http-request.interceptor';
export default function bootstrapRequestInterceptor(app: INestApplication) {
  app.useGlobalInterceptors(new HttpRequestInterceptor());
}
