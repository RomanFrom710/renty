import {inMemoryServer, Task} from 'renty-db';

// May require additional time for downloading MongoDB binaries
beforeAll(() => inMemoryServer.connect(), 180000);

afterAll(() => inMemoryServer.disconnect());

describe('test stuff', () => {
  beforeAll(() => {
    return Task.create({consumer: 'parse-worker', payload: {url: 'kek'}});
  });

  it('finds added task', async () => {
    const result = await Task.count();
    expect(result).toBe(1);
  });
});
