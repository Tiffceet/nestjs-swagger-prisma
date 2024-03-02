// logging.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    // Skip not http
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const now = Date.now();

    return next.handle().pipe(
      tap((responseBody) => {
        // You may log responseBody as well
        if (false) {
          console.log(responseBody);
        }
        this.logToDatabase(context, request, now);
      }),
      catchError((error) => {
        this.logErrorToDatabase(context, request, now, error);
        return throwError(() => error);
      }),
    );
  }

  private async logToDatabase(
    context: ExecutionContext,
    request: Request,
    startTime: number,
  ) {
    const deltaTime = Date.now() - startTime;

    Logger.log(`${request.method} ${request.path}`, {
      requestBody: request.body,
      // responseBody,
      // responseCode: 200, // assuming success
      handler: context.getClass().name,
      // method: request.method,
      // path: request.path,
      requestHeaders: request.headers,
      requestParams: request.params,
      durationInMs: deltaTime,
    });
  }

  private async logErrorToDatabase(
    context: ExecutionContext,
    request: Request,
    startTime: number,
    error: any,
  ) {
    const deltaTime = Date.now() - startTime;

    Logger.error(`${request.method} ${request.path}`, {
      requestBody: request.body,
      handler: context.getClass().name,
      // method: request.method,
      // path: request.path,
      requestHeaders: request.headers,
      requestParams: request.params,
      responseCode: error instanceof HttpException ? error.getStatus() : 0,
      durationInMs: deltaTime,
      error: typeof error === 'string' ? error : JSON.stringify(error),
    });
  }
}
