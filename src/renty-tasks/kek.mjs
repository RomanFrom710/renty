import MongodbMemoryServer from 'mongodb-memory-server';

import {connect, Task} from 'renty-db';

// May require additional time for downloading MongoDB binaries
//jest.setTimeout(180000);

const a = async () => {
  console.log(MongodbMemoryServer);
  const mongoServer = new MongodbMemoryServer();
  const connectionString = await mongoServer.getConnectionString();
  console.log(connectionString);
  //jest.setTimeout(5000);
  return connect(connectionString);
};

const b = async () => {
  const result = await Task.find({});
  console.log(result);
}

const start = async () => {
  await a();
  await b();
}

start();