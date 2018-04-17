import MongodbMemoryServer from 'mongodb-memory-server';

import {connect, Task} from 'renty-db';

// May require additional time for downloading MongoDB binaries
//jest.setTimeout(180000);

beforeAll(async () => {
  const mongoServer = new MongodbMemoryServer();
  const connectionString = await mongoServer.getConnectionString();
  console.log(connectionString);
  //jest.setTimeout(5000);
  return connect(connectionString);
});

describe('test stuff', () => {
  // beforeAll(() => {
  //   return Task.create({consumer: 'parse-worker', payload: {url: 'kek'}});
  // });
 
  it('finds added task', async () => {
    const result = await Promise.resolve(5);
    console.log(result);
  });
});
