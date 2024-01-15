import { Request, Response, NextFunction } from 'express';
import { ErrorCode, HttpException } from '../exceptions';
import { InternalException } from '../exceptions/internalError';

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalException(
          'Something went wrong!',
          ErrorCode.INTERNAL_EXCEPTION,
          error as Error,
        );
      }
      next(exception);
    }
  };
};
