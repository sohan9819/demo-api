import { Response, Request, NextFunction } from 'express';
import { db } from '../db';
import TodoSchema from '../models/todo';
import { Todo } from '@prisma/client';
import ParamsWithId from '../interfaces/ParamsWithId';
import { BadRequestsException } from '../exceptions/badRequests';
import { ErrorCode } from '../exceptions';

/* 
TODO 
getAll
createOne
getById
updateById
deleteById
*/

export const getAll = async (
  req: Request,
  res: Response<Todo[]>,
  _next: NextFunction,
) => {
  const todos = await db.todo.findMany();
  res.status(200);
  res.json(todos);
};

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

export const getById = async (
  req: Request<ParamsWithId, Todo, {}>,
  res: Response<Todo>,
  next: NextFunction,
) => {
  const todoId = req.params.id;
  const todo = await db.todo.findUnique({
    where: {
      id: todoId,
    },
  });

  if (!todo) {
    next(
      new BadRequestsException(
        `🔍 - Not Found - Todo with id ${todoId}`,
        ErrorCode.TODO_NOT_FOUND,
      ),
    );
  }

  res.status(200).json(todo!);
};

export const updateById = async (
  req: Request<ParamsWithId, Todo, TodoSchema>,
  res: Response<Todo>,
  next: NextFunction,
) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;

  const todo = await db.todo.update({
    where: {
      id: todoId,
    },
    data: updatedTodo,
  });

  if (!todo) {
    next(
      new BadRequestsException(
        `🔍 - Not Found - Todo with id ${todoId}`,
        ErrorCode.TODO_NOT_FOUND,
      ),
    );
  }

  res.status(200).json(todo);
};

export const deleteById = async (
  req: Request<ParamsWithId, {}, {}>,
  res: Response<{}>,
  next: NextFunction,
) => {
  const todoId = req.params.id;

  const deletedTodo = await db.todo.delete({
    where: {
      id: todoId,
    },
  });

  if (!deletedTodo) {
    next(
      new BadRequestsException(
        `🔍 - Not Found - Todo with id ${todoId} doesn't exist or already deleted`,
        ErrorCode.TODO_NOT_FOUND,
      ),
    );
  }

  res.status(200).json(deletedTodo);
};
