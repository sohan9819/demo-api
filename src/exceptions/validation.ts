import { ZodIssue } from 'zod';
import { ErrorCode, HttpException } from '.';

export class UnprocessableEntity extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors: ZodIssue[]) {
    super(message, errorCode, 422, errors);
  }
}
