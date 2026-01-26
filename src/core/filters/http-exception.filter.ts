import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { Request, Response } from 'express';

type HttpExceptionResponse =
  | string
  | {
      statusCode?: number;
      message?: string | string[];
      error?: string;
      code?: string;
      details?: unknown;
    };

function firstMessage(message: string | string[] | undefined): string | undefined {
  if (!message) {
    return undefined;
  }

  return Array.isArray(message) ? message[0] : message;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(e: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttpException = e instanceof HttpException;

    const status = isHttpException ? e.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!isHttpException) {
      const err = e instanceof Error ? e : new Error(String(e));

      res.status(status).json({
        statusCode: status,
        error: err.name,
        message: err.message ?? 'Internal Server Error',
        path: req.url,
        timestamp: new Date().toISOString(),
      });

      return;
    }

    const body = e.getResponse() as HttpExceptionResponse;

    if (typeof body === 'string') {
      res.status(status).json({
        statusCode: status,
        error: e.name,
        message: body,
        path: req.url,
        timestamp: new Date().toISOString(),
      });

      return;
    }

    res.status(status).json({
      statusCode: status,
      error: body.error ?? e.name,
      message: firstMessage(body.message) ?? e.message ?? 'Internal Server Error',
      code: body.code,
      details: body.details,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
