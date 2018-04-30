import {inMemoryServer, Task} from 'renty-db';
import * as tasksQueue from '../tasks';

// May require additional time for downloading MongoDB binaries
beforeAll(() => inMemoryServer.connect(), 180000);

afterAll(() => inMemoryServer.disconnect());

const testTask = {
  consumer: 'parse-worker',
  payload: {url: 'http://google.com'},
  priority: 42,
};

describe('tasks queue', () => {
  afterEach(() => Task.remove());

  describe('insertTask', () => {
    it('inserts a task and returns its id', async () => {
      const taskId = await tasksQueue.insertTask(testTask.consumer, testTask.payload, testTask.priority);
      const tasks = await Task.find();

      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(taskId);
      expect(tasks[0]).toEqual(expect.objectContaining(testTask));
    });

    it('changes priority if such task already exists', async () => {
      const {id} = await Task.create(testTask);
      const anotherTask = Object.assign({}, testTask, {priority: 100});
      const updatedId = await tasksQueue.insertTask(anotherTask.consumer, anotherTask.payload, anotherTask.priority);

      expect(updatedId).toBe(id);

      const tasks = await Task.find();
      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(updatedId);
      expect(tasks[0]).toEqual(expect.objectContaining(anotherTask));
    });

    it('inserts task with different payload', async () => {
      const {id} = await Task.create(testTask);
      const anotherTask = Object.assign({}, testTask, {payload: {url: 'http://gugol.com'}});
      const insertedId = await tasksQueue.insertTask(anotherTask.consumer, anotherTask.payload, anotherTask.priority);

      expect(insertedId).not.toBe(id);

      const tasks = await Task.find();
      expect(tasks.length).toBe(2);
    });
  });
});
