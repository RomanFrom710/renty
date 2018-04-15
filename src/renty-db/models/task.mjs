import {Schema, model} from 'mongoose';
import timestamps from 'mongoose-timestamp';

import {taskConsumer, taskStatus} from '../enums';

const taskSchema = new Schema({
  consumer: {type: String, required: true, enum: Object.values(taskConsumer)},
  payload: {type: Object, required: true},
  priority: {type: Number, default: 1},

  status: {type: String, enum: Object.values(taskStatus), default: taskStatus.open},
  result: String,
});
taskSchema.plugin(timestamps); // Adding createdAt and updatedAt

export default model('task', taskSchema);
