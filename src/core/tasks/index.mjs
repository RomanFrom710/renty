import {Task} from '../db';
import {TASK_STATUS} from '../enums';

/**
 * Adds task to the queue. If a task with the same payload has been already inserted,
 * updates the priority.
 *
 * @param {string} consumer Task consumer name.
 * @param {object} payload Payload for the task.
 * @param {number} priority Task priority (1 or greater).
 * @returns {Promise<string>} Id of inserted or updated task.
 */
export async function insertTask(consumer, payload, priority = 1) {
  const query = {consumer, payload};
  const update = {
    $set: {priority},
    $setOnInsert: {consumer, payload},
  };
  const options = {
    upsert: true,
    new: true,
  };

  const upsertedTask = await Task.findOneAndUpdate(query, update, options);
  return upsertedTask.id.toString();
}

/**
 * Takes task for the consumer. Selects the oldest task with the highest priority.
 *
 * @param consumer Task consumer name.
 * @returns {Promise<Task>} A task for the consumer.
 */
export function takeTask(consumer) {
  const query = {consumer};
  const update = {status: TASK_STATUS.open};
  const options = {
    sort: {priority: -1, createdAt: 1},
    lean: true,
  };

  return Task.findOneAndUpdate(query, update, options);
}

/**
 * Increases priority of the task.
 *
 * @param {number} taskId Task id.
 * @param {number} step Value to be added to the task priority.
 * @return {Promise} Task updating promise. Rejects if the task wasn't found.
 */
export async function bumpPriority(taskId, step = 1) {
  const update = {$inc: {priority: step}};
  const updatedTask = await Task.findByIdAndUpdate(taskId, update);
  if (!updatedTask) {
    throw new Error(`Task with id ${taskId} was not found.`);
  }
}
