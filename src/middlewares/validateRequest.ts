import { NextFunction, Request, Response } from 'express';
import RequestValidators from '../interfaces/RequestValidators';
import { ZodError } from 'zod';
import { UnprocessableEntity } from '../exceptions/validation';
import { ErrorCode } from '../exceptions';

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (_e) {
      const error = _e as ZodError;
      next(
        new UnprocessableEntity(
          'Invalid input',
          ErrorCode.UNPROCESSABLE_ENTITY,
          error?.issues,
        ),
      );
    }
  };
}
