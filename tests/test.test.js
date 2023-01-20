const request = require('supertest');
/* global apiUrl */
test("Création d'un user", async () => {
  const res = await request(apiUrl).post('/users').send({
    firstName: 'Jeremy',
    lastName: 'Courby',
    password: 'CourbyJeremy',
    isAdmin: true,
  });

  expect(res.statusCode).toEqual(200);
  // expect(res.body).toHaveProperty('some data present in the body');
});

test('Authentification', async () => {
  const res = await request(apiUrl).post('/auth/login').send({
    firstName: 'Jeremy',
    password: 'CourbyJeremy',
  });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('token');
});

test('Authentification MDP', async () => {
  const res = await request(apiUrl).post('/auth/login').send({
    firstName: 'Jeremy',
    password: 'pasbon',
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toHaveProperty('error');
});

test('Authentification FIRSTNAME', async () => {
  const res = await request(apiUrl).post('/auth/login').send({
    firstName: 'Jermy',
    password: 'CourbyJeremy',
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toHaveProperty('error');
});

test('Authentification NADA', async () => {
  const res = await request(apiUrl).post('/auth/login').send({
    firstName: 'Jeremy',
  });

  expect(res.statusCode).toEqual(400);
  expect(res.body).toHaveProperty('error');
});

test('getUser', async () => {
  const res = await request(apiUrl).get('/users').send({});

  expect(res.statusCode).toEqual(500);
  // expect(res.body).toHaveProperty();
});
