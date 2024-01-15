import { Response, Request, NextFunction } from 'express';
import { db } from '../db';
import TodoSchema from '../models/todo';
import { Todo } from '@prisma/client';

/* 
TODO 
findAll
createOne
findOne
updateOne
deleteOne
*/

export const createOne = async (
  req: Request<{}, TodoSchema, Todo>,
  res: Response<Todo>,
  _next: NextFunction,
) => {
  const createdTodo = await db.todo.create({
    data: req.body,
  });
  res.status(201);
  res.json(createdTodo);
};

export const getAll = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const todos = await db.todo.findMany();
  res.status(200);
  res.json({ todos });
};
