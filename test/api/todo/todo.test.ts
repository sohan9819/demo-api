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

describe('GET /api/todo/:id', () => {
  it('responds with a single todo', async () =>
    request(app)
      .get(`/api/todo/${todoId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(todoId);
        expect(response.body.title).toBe('This is a test todo');
        expect(response.body.status).toBe(false);
      }));
});

describe('PUT /api/todo/:id', () => {
  it('responds with an Invalid Id error for update Todo', async () =>
    request(app)
      .put('/api/todo/invalidId')
      .set('Accept', 'application/json')
      .send({
        title: 'Updated Test Todo',
        status: true,
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errorCode');
        expect(response.body).toHaveProperty('error');
      }));

  it('responds with an updated single todo', async () =>
    request(app)
      .put(`/api/todo/${todoId}`)
      .set('Accept', 'application/json')
      .send({
        title: 'Updated Test Todo',
        status: true,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('status');
        expect(response.body.id).toBe(todoId);
        expect(response.body.title).toBe('Updated Test Todo');
        expect(response.body.status).toBe(true);
      }));
});

describe('DELETE /api/todo/:id', () => {
  it('responds with a successfully Delete message', async () =>
    request(app)
      .delete(`/api/todo/${todoId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('status');
        expect(response.body.id).toBe(todoId);
        expect(response.body.title).toBe('Updated Test Todo');
        expect(response.body.status).toBe(true);
      }));

  it('responds with an error for delete non existing Todo', async () =>
    request(app)
      .delete(`/api/todo/${todoId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errorCode');
        expect(response.body).toHaveProperty('error');
      }));

  it('responds with an Invalid Id error for delete Todo', async () =>
    request(app)
      .delete('/api/todo/invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errorCode');
        expect(response.body).toHaveProperty('error');
      }));
});

describe('GET /api/todo/:id', () => {
  it('responds with an Invalid ObjectId error for single Todo', async () =>
    request(app)
      .get('/api/todo/invalidId')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errorCode');
        expect(response.body).toHaveProperty('error');
      }));

  it('responds with an not found error for single Todo', async () =>
    request(app)
      .get(`/api/todo/${todoId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errorCode');
        expect(response.body).toHaveProperty('error');
      }));
});
