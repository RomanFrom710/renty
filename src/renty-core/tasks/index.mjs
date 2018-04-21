import {Task, enums} from 'renty-db';

/**
 * Adds task to the queue. If a task with the same payload has been already inserted,
 * does nothing.
 *
 * @param {String} consumer Task consumer name.
 * @param {Object} payload Payload for the task.
 * @param {Number} priority Task priority (1 or greater).
 * @returns {Promise} Task insertion promise.
 */
export function insertTask(consumer, payload, priority = 1) {
  const query = {consumer, payload};
  const update = {
    $setOnInsert: {consumer, payload, priority},
  };

  // TODO: Figure out how to return boolean whether a new task was inserted or not.
  return Task.updateOne(query, update);
}

/**
 * Takes task for the consumer. Selects the oldest task with
 * the highest priority.
 *
 * @param consumer Task consumer name.
 * @returns {Promise<Task>} A task for the consumer.
 */
export function takeTask(consumer) {
  const query = {consumer};
  const update = {status: enums.taskStatus.open};
  const options = {
    sort: {priority: -1, createdAt: 1},
    lean: true,
  };

  return Task.findOneAndUpdate(query, update, options).exec();
}

/**
 * Increases priority of the task.
 *
 * @param {Number} taskId Task id.
 * @param {Number} step Value to be added to the task priority.
 * @return {Promise} Task updating promise. Rejects if the task wasn't found.
 */
export async function bumpPriority(taskId, step = 1) {
  const update = {$inc: {priority: step}};
  // TODO: reject when task isn't found
  return Task.findByIdAndUpdate(taskId, update).exec();
}
