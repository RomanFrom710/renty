import mongoose from 'mongoose';

import config from '../config';

const connectionString = config.get('db');
mongoose.connect(connectionString);

export * from './models';
