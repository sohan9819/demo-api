import request from 'supertest';
import app from '../../../src/app';

describe('GET /api/emoji', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/emoji')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});
