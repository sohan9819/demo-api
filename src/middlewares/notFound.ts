import { NextFunction, Request, Response } from 'express';
import { BadRequestsException } from '../exceptions/badRequests';
import { ErrorCode } from '../exceptions';

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(
    new BadRequestsException(
      `🔍 - Not Found - ${req.originalUrl}`,
      ErrorCode.NOT_FOUND,
    ),
  );
}
