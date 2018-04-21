import mongoose from 'mongoose';

import {env, config} from 'renty-config';
import enums from './enums';
import inMemoryServer from './in-memory-server';

// Test scripts may want to use temporary in-memory database.
if (!env.isTest()) {
  const connectionString = config.get('db');
  mongoose.connect(connectionString);
}

export {
  enums,
  inMemoryServer,
};

export * from './models';
