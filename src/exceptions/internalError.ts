import { ErrorCode, HttpException } from '.';

export class InternalException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors: Error) {
    super(message, errorCode, 500, errors);
  }
}
