// message, status code, error codes, error

import { ZodIssue } from 'zod';

export class HttpException extends Error {
  message: string;

  errorCode: ErrorCode;

  statusCode: number;

  errors: string | Error | ZodIssue | null;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any,
  ) {
    super(message);

    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  NOT_FOUND = 1404,
  TODO_NOT_FOUND = 2404,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
}
