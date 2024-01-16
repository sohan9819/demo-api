import { Router } from 'express';
import {
  getAll,
  createOne,
  getById,
  updateById,
  deleteById,
} from '../handlers/todo';
import { validateRequest } from '../middlewares/validateRequest';
import TodoSchema from '../models/todo';
import { errorHandler } from '../middlewares/errorHandler';
import ParamsWithId from '../interfaces/ParamsWithId';

const routes: Router = Router();

routes.get('/', errorHandler(getAll));
routes.post(
  '/',
  validateRequest({ body: TodoSchema }),
  errorHandler(createOne),
);
routes.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  errorHandler(getById),
);
routes.put(
  '/:id',
  validateRequest({ params: ParamsWithId, body: TodoSchema }),
  errorHandler(updateById),
);
routes.delete(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  errorHandler(deleteById),
);

export default routes;
