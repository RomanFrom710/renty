import {Schema, model} from 'mongoose';
import timestamps from 'mongoose-timestamp';

import {taskConsumer, taskStatus} from '../enums';

const taskSchema = new Schema({
  consumer: {type: String, required: true, enum: Object.values(taskConsumer)},
  payload: {type: String, required: true},
  priority: {type: Number, default: 1},

  status: {type: String, required: true, enum: Object.values(taskStatus)},
  message: String,
});
taskSchema.plugin(timestamps); // Adding createdAt and updatedAt

export default model('task', taskSchema);
