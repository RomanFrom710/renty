import {Task} from '../../db';
import {TASK_CONSUMER} from '../../enums';
import * as tasksQueue from '..';

const testTask = {
  consumer: TASK_CONSUMER.parser,
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

  describe('takeTask', () => {
    it('returns null if there is no tasks left', async () => {
      const task = await tasksQueue.takeTask(TASK_CONSUMER.scanner);
      expect(task).toBeNull();
    });

    it('takes the oldest task with the highest priority', async () => {
      const tasks = [
        Object.assign({}, testTask, {createdAt: new Date('2016'), priority: 2}),
        Object.assign({}, testTask, {createdAt: new Date('2017'), priority: 1}),
        Object.assign({}, testTask, {createdAt: new Date('2016'), priority: 1}),
        Object.assign({}, testTask, {createdAt: new Date('2017'), priority: 2}),
        Object.assign({}, testTask, {createdAt: new Date('2017'), priority: 3, consumer: TASK_CONSUMER.scanner}),
      ];
      await Task.create(tasks);

      const task = await tasksQueue.takeTask(testTask.consumer);
      expect(task.priority).toBe(2);
      expect(task.createdAt).toEqual(new Date('2016'));
    });
  });

  describe('bumpPriority', () => {
    let taskId;
    beforeEach(async () => {
      taskId = (await Task.create(testTask)).id.toString();
    });

    it('rejects if task was not found', () => {
      const id = '590650500000000000000000'; // Generated from 2017 timestamp, so won't be repeated.
      const bumpPromise = tasksQueue.bumpPriority(id);
      return expect(bumpPromise).rejects.toEqual(new Error(`Task with id ${id} was not found.`));
    });

    it('increases priority by 1 by default', async () => {
      await tasksQueue.bumpPriority(taskId);
      const task = await Task.findOne();
      expect(task.priority).toBe(testTask.priority + 1);
    });

    it('increases priority by provided step', async () => {
      const step = 5;
      await tasksQueue.bumpPriority(taskId, step);
      const task = await Task.findOne();
      expect(task.priority).toBe(testTask.priority + step);
    });
  });
});
