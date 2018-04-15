import MongodbMemoryServer from 'mongodb-memory-server';

import {connect, Task} from 'renty-db';

beforeAll(async () => {
  const mongoServer = new MongodbMemoryServer();
  const connectionString = await mongoServer.getConnectionString();
  return connect(connectionString);
});

describe('test stuff', async () => {
  beforeAll(() => {
    Task.insert({consumer: 'parse-worker', payload: {url: 'kek'}});
  });

  it('finds added task', async () => {
    const result = await Task.find({});
    console.log(result);
  });
});
