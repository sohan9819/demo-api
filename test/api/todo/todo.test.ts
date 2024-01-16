import request from 'supertest';
import app from '../../../src/app';
import { db } from '../../../src/db';

beforeAll(async () => {
  try {
    await db.todo.deleteMany();
  } catch (error) {}
});

describe('GET /api/todo', () => {
  it('responds with a empty Todo list', async () => {
    await request(app)
      .get('/api/todo')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      });
  });
});

let todoId = '';

describe('POST /api/todo', () => {
  it('responds with an error if the todo is invalid', async () =>
    request(app)
      .post('/api/todo')
      .set('Accept', 'application/json')
      .send({
        title: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errorCode');
        expect(response.body).toHaveProperty('error');

        expect(response.body.message).toBe('Invalid input');
        expect(response.body.errorCode).toBe(2001);
      }));

  it('responds with an inserted object', async () => {
    request(app)
      .post('/api/todo')
      .set('Accept', 'application/json')
      .send({
        title: 'This is a test todo',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('status');

        expect(response.body.title).toBe('This is a test todo');
        expect(response.body.status).toBe(false);

        todoId = response.body.id;
      });
  });

  it('responds with a Todo list having 1 todo', async () => {
    await request(app)
      .get('/api/todo')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(1);
        expect(response.body[0].id).toBe(todoId);
      });
  });
});
