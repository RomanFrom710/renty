import {Schema, model} from 'mongoose';
import timestamps from 'mongoose-timestamp';

const taskSchema = new Schema({
  consumer: {type: String, required: true, enum: ['parse-worker', 'scan-worker']},
  payload: {type: String, required: true},
  priority: {type: Number, default: 1},

  status: {type: String, required: true, enum: ['open', 'in-progress', 'success', 'fail']},
  message: String,
});
taskSchema.plugin(timestamps); // Adding createdAt and updatedAt

export default model('task', taskSchema);
