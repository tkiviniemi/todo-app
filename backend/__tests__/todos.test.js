const { describe, test, expect, afterAll } = require('@jest/globals');
const supertest = require('supertest');

const connection = require('../db/pool');

const app = require('../app');

describe('GET todos endpoint', () => {
  test('should return 200', (done) => {
    supertest(app).get('/api/todos').expect(200).end(done);
  });

  test('should return json data', async () => {
    const response = await supertest(app)
      .get('/api/todos')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          task: 'Learn Node',
          tag: 'study',
          done: 0,
        }),
        expect.objectContaining({
          id: 2,
          task: 'Learn Express',
          tag: 'study',
          done: 0,
        }),
      ])
    );
  });
});

describe('GET todo by ID endpoint', () => {
  test('should return 200 if todo exists', (done) => {
    supertest(app).get('/api/todos/1').expect(200).end(done);
  });

  test('should return 200 and json if the todo was found', async () => {
    const response = await supertest(app)
      .get('/api/todos/1')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        task: 'Learn Node',
        tag: 'study',
        done: 0,
      })
    );
  });
});

describe('POST todo endpoint', () => {
  const loggedInUser = {
    id: '',
    email: '',
    token: '',
  };

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email = ?', [
      'john.wayne@domain.com',
    ]);
    const data = {
      name: 'John Wayne',
      email: 'john.wayne@domain.com',
      password: 'password123',
    };
    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .send(data);
    loggedInUser.id = response.body.id;
    loggedInUser.email = response.body.email;
    loggedInUser.token = response.body.token;
  });

  afterAll(async () => {
    const deleteQuery = "DELETE FROM todos WHERE task LIKE 'Test Todo%';";
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  });

  test('Should create a new todo', async () => {
    const todo = {
      task: 'Test Todo',
      tag: 'test',
      done: false,
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.task).toEqual('Test Todo');
    expect(response.body.tag).toEqual('test');
    expect(response.body.done).toEqual(false);
  });

  test('Should be able to create a todo without done value', async () => {
    const todo = {
      task: 'Test Todo Without Done',
      tag: 'test',
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.task).toEqual('Test Todo Without Done');
    expect(response.body.tag).toEqual('test');
    expect(response.body.done).toEqual(false);
  });

  test('Should not create a todo without a task property', async () => {
    const todo = {
      tag: 'test',
      done: false,
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"task" is required');
  });

  test('Should not create a todo without a tag property', async () => {
    const todo = {
      task: 'Test Todo Without Tag',
      done: false,
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"tag" is required');
  });

  test('Should not create a todo with and empty task value', async () => {
    const todo = {
      task: '',
      tag: 'test',
      done: false,
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"task" is not allowed to be empty');
  });

  test('Should not create a todo with and empty tag value', async () => {
    const todo = {
      task: 'Test Todo With Empty Tag',
      tag: '',
      done: false,
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('"tag" is not allowed to be empty');
  });

  test('Should not create a todo with a too short value for task', async () => {
    const todo = {
      task: 'Tes',
      tag: 'test',
      done: false,
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"task" length must be at least 4 characters long'
    );
  });

  test('Should not create a todo with a too short value for tag', async () => {
    const todo = {
      task: 'Test Todo',
      tag: 'tes',
      done: false,
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(400);
    expect(response.text).toContain(
      '"tag" length must be at least 4 characters long'
    );
  });

  test('Should not create a duplicate todo', async () => {
    const todo = {
      task: 'Learn Node',
      tag: 'study',
      done: 'false',
    };

    const response = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    expect(response.status).toEqual(400);
    expect(response.text).toContain('Todo already exists');
  });
});

describe('DELETE todo endpoint', () => {
  const loggedInUser = {
    id: '',
    email: '',
    token: '',
  };

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email = ?', [
      'john.wayne@domain.com',
    ]);
    const data = {
      name: 'John Wayne',
      email: 'john.wayne@domain.com',
      password: 'password123',
    };

    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .send(data);
    loggedInUser.id = response.body.id;
    loggedInUser.email = response.body.email;
    loggedInUser.token = response.body.token;
  });

  test('Should delete a todo by id', async () => {
    const todo = {
      task: 'Test Task Delete',
      tag: 'test',
      done: false,
    };

    const postResponse = await supertest(app)
      .post('/api/todos')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .send(todo);

    const id = postResponse.body.id;

    const deleteResponse = await supertest(app)
      .delete(`/api/todos/${id}`)
      .set('Authorization', `Bearer ${loggedInUser.token}`)
      .set('Accept', 'application/json');

    expect(deleteResponse.status).toEqual(200);
    expect(deleteResponse.text).toEqual('Todo deleted');
  });
});
