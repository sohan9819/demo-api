import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';
import ErrorResponse from '../interfaces/ErrorResponse';

export default function errors(
  error: HttpException,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    error: error.errors,
  });
}
