const { describe, test, expect } = require('@jest/globals');
const supertest = require('supertest');

const connection = require('../db/pool');

const app = require('../app');

describe('SIGNUP users endpoint', () => {
  beforeAll(async () => {
    const deleteQuery = 'DELETE FROM users WHERE email=?;';
    connection.query(deleteQuery, ['testitauno@test.com'], (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test('should signup user with valid credentials', async () => {
    const data = {
      name: 'Testi Tauno',
      email: 'testitauno@test.com',
      password: 'testitauno',
    };

    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(data);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });

  test('should login user with valid credentials', async () => {
    const data = {
      email: 'testitauno@test.com',
      password: 'testitauno',
    };

    const response = await supertest(app)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(data);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });
});
