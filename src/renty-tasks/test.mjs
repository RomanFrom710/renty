import MongodbMemoryServer from 'mongodb-memory-server';

import {connect, disconnect, Task} from 'renty-db';

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer();
  const connectionString = await mongoServer.getConnectionString();
  await connect(connectionString);
}, 180000); // May require additional time for downloading MongoDB binaries

afterAll(async () => {
  await disconnect();
  await mongoServer.stop();
});

describe('test stuff', () => {
  beforeAll(() => {
    return Task.create({consumer: 'parse-worker', payload: {url: 'kek'}});
  });

  it('finds added task', async () => {
    const result = await Task.count();
    expect(result).toBe(1);
    console.log(result);
  });
});
