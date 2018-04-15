import mongoose from 'mongoose';

import config from 'renty-config';
import Apartment from './models/apartment';
import Snapshot from './models/snapshot';
import Task from './models/task';
import enums from './enums';

if (process.env.NODE_ENV !== 'test') {
  const connectionString = config.get('db');
  mongoose.connect(connectionString);
}

/**
 * Let testing scripts connect with custom connection string.
 *
 * @param {String} connectionString MongoDB connection string.
 * @returns {Promise} MongoDB connection promise.
 */
async function connect(connectionString) {
  return mongoose.connect(connectionString);
}

export {
  Apartment,
  Snapshot,
  Task,
  enums,
  connect,
};
