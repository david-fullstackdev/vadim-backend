const _ = require('lodash');
const { reset } = require('../../database/db-reset');
const UserService = require('./user.service');

let service = new UserService();

beforeAll(reset);

test('signup', async () => {
  const data = { first_name: 'Joe', last_name: 'Doe', email: 'joe.doe@tbd.com' };
  const args = _.values(data).concat('test');
  const result = await service.signup(...args);

  expect(result.rows[0]).toEqual(data);
});

test('login', () => {
  const credentials = ['john.smith@tbd.com', 'test'];
  const promise = service.login(...credentials);

  expect(promise).resolves.toBeTruthy();
  expect(promise).resolves.toEqual(expect.objectContaining({
    first_name: expect.any(String),
    last_name: expect.any(String),
    email: expect.any(String),
    admin: expect.any(Boolean),
    token: expect.any(String),
  }));
});

test('login with wrong credentials', () => {
  const credentials = ['test', 'test'];
  expect(service.login(...credentials)).rejects.toBeTruthy();
});

test('get_categories', async () => {
  const result = await service.get_categories(2);

  expect(result.length).toBe(3);
  expect(result[0]).toEqual(expect.objectContaining({
    id: expect.any(Number),
    category: expect.any(String),
    display_name: expect.any(String),
    pictureUrl: expect.any(String)
  }));
});

test('get_modules', async() => {
  const result = await service.get_modules(2);

  expect(result.length).toBe(2);
  expect(result[0]).toEqual(expect.objectContaining({
    module: expect.any(String),
    display_name: expect.any(String),
  }));
});

test('add_category', async () => {
  const userId = 2;
  const categoryId = 3;
  const result = await service.add_category(categoryId, userId);

  expect(result).toMatchObject({
    category_id: categoryId,
    user_id: userId,
  });
});

test('delete_category', async () => {
  const userId = 2;
  const categoryId = 3;
  const result = await service.delete_category(categoryId, userId);

  expect(result.rowCount).toBe(1);
  expect(result.rows[0]).toMatchObject({
    category_id: categoryId,
    user_id: userId,
  });
});
