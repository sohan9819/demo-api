import { Router } from 'express';
import { getAll, createOne } from '../handlers/todo';
import { validateRequest } from '../middlewares/validateRequest';
import TodoSchema from '../models/todo';
import { errorHandler } from '../middlewares/errorHandler';

const routes: Router = Router();

routes.get('/', errorHandler(getAll));
routes.post(
  '/',
  validateRequest({ body: TodoSchema }),
  errorHandler(createOne),
);

export default routes;
