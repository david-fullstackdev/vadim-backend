const Server = require('./server');

let server;

const listen = jest.fn();
const app = { listen };

beforeEach(() => {
  server = new Server(app, 1234);
});

test('server has correct port', () => {
  expect(server.port).toBe(1234);
});

test('server runs app listen', () => {
  expect(listen.mock.calls.length).toBe(0);
  server.listen();
  expect(listen.mock.calls.length).toBe(1);
});